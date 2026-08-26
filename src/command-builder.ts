import type { CosmiconfigResult } from 'cosmiconfig'
import type { Argv } from 'yargs'
import { cosmiconfig } from 'cosmiconfig'
import { TypeScriptLoader as typeScriptLoader } from 'cosmiconfig-typescript-loader'
import { execa } from 'execa'
import fse from 'fs-extra'
import fs from 'node:fs'
import { availableParallelism } from 'node:os'
import path from 'node:path'
import { PassThrough } from 'node:stream'
import { packageUp } from 'package-up'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import type { Diagnostic, LintReport, ToolRun } from './diagnostics.js'
import type { OutputFormat } from './output-format.js'
import type { CwdOverrideOptions } from './path-utilities.js'
import type { ForegroundColor } from './stream-utilities.js'
import { version } from '../package.json' with { type: 'json' }
import {
	getChildColorEnvironment,
	getColors,
	getLogDestination,
	shouldColorStream,
} from './color-utilities.js'
import { createLintReport, renderMachineDiagnostic, toOutputLines } from './diagnostics.js'
import { isErrorExecaError } from './execa-utilities.js'
import { merge, mergeVsCodeTasks, stringify } from './json-utilities.js'
import {
	detectAndSetOutputFormat,
	getOutputFormat,
	OUTPUT_FORMAT_OPTIONS,
} from './output-format.js'
import { getCwdOverride, getWorkspaceRoot } from './path-utilities.js'
import { formatFileInPlace } from './prettier-utilities.js'
import { createStreamFilter, createStreamTransform, streamToString } from './stream-utilities.js'
import { pluralize } from './string-utilities.js'

type CommandCommon = {
	/** Customizes color of log prefix string. Default color used if undefined. */
	logColor?: ForegroundColor
	/** Enables a string prefix in the log output. False if undefined. */
	logPrefix?: string
	/** CLI command name to execute, or function name to be used in logs */
	name: string
	/**
	 * Commands with the same stage may run concurrently; stages run in ascending
	 * order.
	 */
	stage?: number
}

type CommandCache = {
	/** Cache flags excluding the location, which is added consistently by KSC. */
	flags: string[]
	/** Tool-specific cache file name below `<workspace>/node_modules/.cache/ksc/`. */
	name: string
}

/** Captured output and context handed to a `collect.parse` adapter. */
export type CollectContext = {
	/** Working directory the tool ran in, for resolving relative paths. */
	cwd: string
	exitCode: number
	stderr: string
	stdout: string
}

/** Normalized result of collecting a command's output. */
export type CollectResult = {
	diagnostics: Diagnostic[]
	/** Output lines the adapter could not interpret. Never silently dropped. */
	unparsed: string[]
}

export type CommandFunction = CommandCommon & {
	/**
	 * Structured counterpart to `execute` used in machine and JSON output modes.
	 * Performs the same check but returns diagnostics instead of writing to a
	 * stream. Commands without one fall back to capturing `execute` output as
	 * unparsed lines.
	 */
	collect?: (
		positionalArguments: string[],
		optionFlags: string[],
	) => Promise<CollectResult & { exitCode: number }>
	execute: (
		logStream: NodeJS.WritableStream,
		positionalArguments: string[], // Passed by default, but can be ignored in implementation
		optionFlags: string[], // Passed by default, but can be ignored in implementation
	) => Promise<number>
}

export type CommandCli = CommandCommon & {
	/** Built-in tool cache configuration. */
	cache?: CommandCache
	/**
	 * Adapter used in machine and JSON output modes: the command runs with its
	 * output captured (with `collect.optionFlags` replacing `optionFlags` if
	 * provided, e.g. to select a tool's JSON reporter) and `parse` turns the
	 * captured output into diagnostics. Commands without one fall back to passing
	 * captured output through as unparsed lines.
	 */
	collect?: {
		optionFlags?: string[]
		parse: (context: CollectContext) => CollectResult
	}
	/**
	 * Optionally change the context where the command is executed. Defaults to
	 * `process.cwd()` if undefined.
	 */
	cwdOverride?: CwdOverrideOptions
	/** Command-local fixed option flags. */
	optionFlags?: string[]
	/** Optional filter to suppress matching lines from stdout/stderr. */
	outputFilter?: (line: string) => boolean
	/**
	 * Set on commands that spawn `ksc-*` lint or fix CLIs, which honor
	 * `KSC_FORMAT` themselves: in machine mode their output passes through
	 * untouched, and in JSON mode their stdout is parsed as a nested `LintReport`
	 * and merged.
	 */
	outputFormatAware?: boolean
	/** Command-local fixed positional arguments. */
	positionalArguments?: string[]
	/** Formats and colorizes output if JSON. False if undefined. */
	prettyJsonOutput?: boolean
	/**
	 * If true, option flags are passed in from the parent command. False if
	 * undefined.
	 */
	receiveOptionFlags?: boolean
	/**
	 * If true, positional arguments are passed in from the parent command. False
	 * if undefined.
	 */
	receivePositionalArguments?: boolean
	/** Comes immediately after the command */
	subcommands?: string[]
}

/** A nested command group executed in-process under the same worker budget. */
export type CommandGroup = CommandCommon & {
	commands: (() => Promise<Command[]>) | Command[]
	kind: 'group'
	/** Whether commands in the same stage are parallel-safe. */
	parallel?: boolean
	positionalArgumentDefault?: string
	positionalArgumentMode: LintCommand['positionalArgumentMode']
	/** Append the resolved child command names to the parent `Running:` line. */
	showResolvedCommands?: boolean
	/** Human-facing aggregate subcommand name, e.g. `lint` or `fix`. */
	subcommand: string
	/** Show a parent-style `Running:` line without making leaf commands verbose. */
	verbose?: boolean
}

export type Command = CommandCli | CommandFunction | CommandGroup

// Init
// Optionally takes --location option flag
type InitCommand = {
	/** Optional additional commands to run */
	commands?: Command[]
	/** Specific config file */
	configFile?: string
	configPackageJson?: Record<string, unknown>
	/** Optional, just used for top-level shared-config command */
	description?: string
	locationOptionFlag: boolean
}

// Lint
// Optionally takes files (plural) positional arguments (array of strings, possibly expanded from glob?)
type LintCommand = {
	/**
	 * Commands to run, or a function that resolves them at execution time (e.g.
	 * for project-dependent command selection).
	 */
	commands: (() => Promise<Command[]>) | Command[]
	description: string
	/**
	 * Run commands in each stage concurrently, subject to the global worker
	 * budget.
	 */
	parallel?: boolean
	positionalArgumentDefault?: string // Only applies if arguments mode is not 'none'
	positionalArgumentMode: 'none' | 'optional' | 'required'
	/** Append the resolved child command names to an aggregate `Running:` line. */
	showResolvedCommands?: boolean
}

/** Resolve a static or lazily-generated command list. */
async function resolveCommands(
	commands: (() => Promise<Command[]>) | Command[],
): Promise<Command[]> {
	return typeof commands === 'function' ? commands() : commands
}

// Fix
// Same as lint for now
type FixCommand = LintCommand

// Print Config
// Same as lint for now, Optionally takes file (singular) positional argument
type PrintConfigCommand = LintCommand

export type Commands = {
	fix?: FixCommand
	init?: InitCommand
	lint?: LintCommand
	printConfig?: PrintConfigCommand
}

// Exported for aggregation later
export type CommandDefinition = {
	commands: Commands
	description: string
	logColor: ForegroundColor
	logPrefix: string | undefined
	name: string
	order: number
	showSummary?: boolean
	verbose?: boolean
}

async function executeFunctionCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
	optionFlags: string[],
	command: CommandFunction,
	verbose?: boolean,
): Promise<number> {
	// Add to the log stream if desired
	let targetStream: NodeJS.WritableStream

	if (command.logPrefix === undefined) {
		targetStream = logStream
	} else {
		const subStream = createStreamTransform(command.logPrefix, command.logColor)
		subStream.pipe(logStream)
		targetStream = subStream
	}

	if (verbose) {
		targetStream.write(
			getColors().bold(
				`Running: "${command.name}() with Positional arguments: ${String(positionalArguments)} and Option flags: ${String(optionFlags)}"`,
			) + '\n',
		)
	}

	try {
		return await command.execute(targetStream, positionalArguments, optionFlags)
	} catch (error) {
		console.error(String(error))
		return 1
	}
}

/** Assembles the full argument list for a CLI command invocation. */
function resolveCliArguments(
	command: CommandCli,
	positionalArguments: string[],
	optionFlags: string[],
	activeOptionFlags: string[] | undefined,
	cache: boolean,
): string[] {
	return [
		...(command.subcommands ?? []),
		...(command.receiveOptionFlags ? optionFlags : []),
		...(activeOptionFlags ?? []),
		...(cache && command.cache !== undefined
			? [
					...command.cache.flags,
					'--cache-location',
					path.join(getWorkspaceRoot(), 'node_modules', '.cache', 'ksc', command.cache.name),
				]
			: []),
		...(command.receivePositionalArguments ? positionalArguments : []),
		...(command.positionalArguments ?? []),
	]
}

async function executeCliCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
	optionFlags: string[],
	command: CommandCli,
	cache: boolean,
	verbose?: boolean,
): Promise<number> {
	let exitCode = 1 // Assume failure

	// Add to the log stream if desired
	let targetStream: NodeJS.WritableStream

	if (command.logPrefix === undefined) {
		targetStream = logStream
	} else {
		const subStream = createStreamTransform(command.logPrefix, command.logColor)
		subStream.pipe(logStream)
		targetStream = subStream
	}

	const resolvedArguments = resolveCliArguments(
		command,
		positionalArguments,
		optionFlags,
		command.optionFlags,
		cache,
	)

	// Manage current working directory
	const cwd = getCwdOverride(command.cwdOverride)

	if (verbose) {
		targetStream.write(`Running: "${command.name} ${resolvedArguments.join(' ')}"\n`)
	}

	const prettyJsonStream = command.prettyJsonOutput ? new PassThrough() : undefined
	const cliTargetStream = prettyJsonStream ?? targetStream

	// Children write to pipes and would disable color on their own, so mirror the
	// parent's decision for its own destination. Color is off when output is
	// piped to a non-TTY, captured for machine or JSON parsing, or parsed for
	// JSON pretty-printing
	const colorEnv = getChildColorEnvironment(
		getOutputFormat() === 'native' &&
			command.prettyJsonOutput !== true &&
			shouldColorStream(getLogDestination()),
	)

	try {
		const subprocess = execa(command.name, resolvedArguments, {
			cwd,
			env: colorEnv,
			preferLocal: true,
			reject: false, // Prevents throwing on non-zero exit code
			stdin: 'inherit',
		})

		// End false is required here, otherwise the stream will close before the subprocess is done
		if (command.outputFilter) {
			const stdoutFilter = createStreamFilter(command.outputFilter)
			const stderrFilter = createStreamFilter(command.outputFilter)
			subprocess.stdout.pipe(stdoutFilter).pipe(cliTargetStream, { end: false })
			subprocess.stderr.pipe(stderrFilter).pipe(cliTargetStream, { end: false })
		} else {
			subprocess.stdout.pipe(cliTargetStream, { end: false })
			subprocess.stderr.pipe(cliTargetStream, { end: false })
		}

		const result = await subprocess

		if (prettyJsonStream !== undefined) {
			prettyJsonStream.end()
			const jsonString = await streamToString(prettyJsonStream)
			const prettyAndColorfulJsonLines = stringify(JSON.parse(jsonString)).split('\n')
			for (const line of prettyAndColorfulJsonLines) {
				targetStream.write(`${line}\n`)
			}
		}

		exitCode = result.exitCode ?? 1
	} catch (error) {
		// Extra debugging...
		console.error(`${command.name} failed with error:`)
		console.error(error)
		if (isErrorExecaError(error)) {
			exitCode = typeof error.exitCode === 'number' ? error.exitCode : 1
		}
	}

	return exitCode
}

// Type guard for CommandCli vs CommandFunction
function isCommandFunction(command: Command): command is CommandFunction {
	return 'execute' in command
}

/** Type guard for an in-process nested command group. */
function isCommandGroup(command: Command): command is CommandGroup {
	return 'kind' in command
}

/**
 * Runs a CLI command with output captured instead of streamed, for the machine
 * and JSON output modes. Color is disabled so parsers see plain text.
 * Optionally streams stderr through (used to surface progress from format-aware
 * ksc-* children while their stdout is captured).
 */
async function runCliCommandCaptured(
	positionalArguments: string[],
	optionFlags: string[],
	command: CommandCli,
	cache: boolean,
	pipeStderrTo?: NodeJS.WritableStream,
): Promise<CollectContext> {
	const activeOptionFlags = command.collect?.optionFlags ?? command.optionFlags
	const resolvedArguments = resolveCliArguments(
		command,
		positionalArguments,
		optionFlags,
		activeOptionFlags,
		cache,
	)
	const cwd = getCwdOverride(command.cwdOverride)

	try {
		const subprocess = execa(command.name, resolvedArguments, {
			cwd,
			env: getChildColorEnvironment(false),
			preferLocal: true,
			reject: false,
			stdin: 'inherit',
		})

		if (pipeStderrTo !== undefined) {
			subprocess.stderr.pipe(pipeStderrTo, { end: false })
		}

		const result = await subprocess
		return {
			cwd,
			exitCode: result.exitCode ?? 1,
			stderr: result.stderr,
			stdout: result.stdout,
		}
	} catch (error) {
		console.error(`${command.name} failed with error:`)
		console.error(error)
		const exitCode =
			isErrorExecaError(error) && typeof error.exitCode === 'number' ? error.exitCode : 1
		return { cwd, exitCode, stderr: '', stdout: '' }
	}
}

/** Result of collecting a single command's run in machine or JSON mode. */
type CommandCollectOutcome = {
	diagnostics: Diagnostic[]
	exitCode: number
	/** Usually one entry; several when merging a format-aware child's report. */
	tools: ToolRun[]
}

function isLintReport(value: unknown): value is LintReport {
	return (
		typeof value === 'object' &&
		value !== null &&
		'version' in value &&
		value.version === 1 &&
		'diagnostics' in value &&
		Array.isArray(value.diagnostics) &&
		'success' in value &&
		typeof value.success === 'boolean' &&
		'tools' in value &&
		Array.isArray(value.tools)
	)
}

/** Parsed errors are authoritative even if a child tool accidentally exits 0. */
function getCollectedExitCode(exitCode: number, diagnostics: Diagnostic[]): number {
	return exitCode === 0 && diagnostics.some(({ severity }) => severity === 'error') ? 1 : exitCode
}

/**
 * Runs a single command in collect mode: captures its output and turns it into
 * diagnostics via its adapter, falling back to unparsed lines so tool output is
 * never silently dropped.
 */
async function collectCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
	optionFlags: string[],
	command: Command,
	cache: boolean,
): Promise<CommandCollectOutcome> {
	const startTime = Date.now()
	const elapsed = () => Date.now() - startTime

	if (isCommandFunction(command)) {
		if (command.collect !== undefined) {
			try {
				const collected = await command.collect(positionalArguments, optionFlags)
				const exitCode = getCollectedExitCode(collected.exitCode, collected.diagnostics)
				return {
					diagnostics: collected.diagnostics,
					exitCode,
					tools: [
						{
							durationMs: elapsed(),
							exitCode,
							name: command.name,
							unparsed: collected.unparsed,
						},
					],
				}
			} catch (error) {
				return {
					diagnostics: [],
					exitCode: 1,
					tools: [
						{ durationMs: elapsed(), exitCode: 1, name: command.name, unparsed: [String(error)] },
					],
				}
			}
		}

		// Fallback: run the human implementation with its output captured
		let captured = ''
		const captureStream = new PassThrough()
		captureStream.on('data', (chunk: string | Uint8Array) => {
			captured += chunk.toString()
		})

		let exitCode: number
		try {
			exitCode = await command.execute(captureStream, positionalArguments, optionFlags)
		} catch (error) {
			captured += `\n${String(error)}`
			exitCode = 1
		}

		return {
			diagnostics: [],
			exitCode,
			tools: [
				{ durationMs: elapsed(), exitCode, name: command.name, unparsed: toOutputLines(captured) },
			],
		}
	}

	if (isCommandGroup(command)) {
		throw new Error('Command groups must be expanded before collection')
	}

	// Format-aware ksc-* children emit their own JSON report on stdout (this
	// path is only reached in JSON mode; machine mode passes them through)
	if (command.outputFormatAware) {
		const context = await runCliCommandCaptured(
			positionalArguments,
			optionFlags,
			command,
			cache,
			logStream,
		)

		try {
			const report: unknown = JSON.parse(context.stdout)
			if (!isLintReport(report)) {
				throw new Error('Child output is not a lint report')
			}

			return {
				diagnostics: report.diagnostics,
				exitCode:
					context.exitCode === 0 &&
					report.success &&
					report.diagnostics.every(({ severity }) => severity !== 'error')
						? 0
						: 1,
				tools: report.tools,
			}
		} catch {
			return {
				diagnostics: [],
				exitCode: context.exitCode,
				tools: [
					{
						durationMs: elapsed(),
						exitCode: context.exitCode,
						name: command.name,
						unparsed: toOutputLines(context.stdout),
					},
				],
			}
		}
	}

	const context = await runCliCommandCaptured(positionalArguments, optionFlags, command, cache)

	if (command.collect !== undefined) {
		try {
			const { diagnostics, unparsed } = command.collect.parse(context)
			const exitCode = getCollectedExitCode(context.exitCode, diagnostics)
			return {
				diagnostics,
				exitCode,
				tools: [{ durationMs: elapsed(), exitCode, name: command.name, unparsed }],
			}
		} catch (error) {
			return {
				diagnostics: [],
				exitCode: context.exitCode,
				tools: [
					{
						durationMs: elapsed(),
						exitCode: context.exitCode,
						name: command.name,
						unparsed: [
							...toOutputLines(context.stdout),
							...toOutputLines(context.stderr),
							String(error),
						],
					},
				],
			}
		}
	}

	// No adapter: pass everything through as unparsed lines
	return {
		diagnostics: [],
		exitCode: context.exitCode,
		tools: [
			{
				durationMs: elapsed(),
				exitCode: context.exitCode,
				name: command.name,
				unparsed: [...toOutputLines(context.stdout), ...toOutputLines(context.stderr)],
			},
		],
	}
}

const KSC_PREFIX_REGEX = /^ksc-/v

/** Strip `ksc-` prefix for flexible name matching. */
function normalizeCommandName(name: string): string {
	return name.replace(KSC_PREFIX_REGEX, '')
}

/** Handle comma-separated and repeated --skip values. */
function normalizeSkipValues(skip: string[] | undefined): string[] {
	if (skip === undefined || skip.length === 0) {
		return []
	}

	return skip
		.flatMap((value) => value.split(','))
		.map((value) => normalizeCommandName(value.trim()))
}

/** Add --skip option to a yargs builder. */
function addSkipOption<T>(yargsInstance: Argv<T>): Argv<T> {
	return yargsInstance.option('skip', {
		array: true,
		describe: 'Tool names to skip (with or without "ksc-" prefix).',
		type: 'string',
	})
}

/** Add --format option to a yargs builder. Shared by the lint and fix commands. */
function addFormatOption<T>(yargsInstance: Argv<T>) {
	return yargsInstance.option('format', {
		choices: OUTPUT_FORMAT_OPTIONS,
		default: 'native' as const,
		describe:
			'Output format: "native" streams each tool\'s own output, "machine" prints one parseable line per issue for editor problem matchers, "json" prints an aggregate report.',
	})
}

/** Add the shared cache option to lint and fix commands. */
function addCacheOption<T>(yargsInstance: Argv<T>) {
	return yargsInstance.option('cache', {
		boolean: true,
		default: true,
		describe:
			'Use tool-native caches stored below node_modules/.cache/ksc at the workspace root. Disable with --no-cache.',
	})
}

/**
 * True when a command should stream its output directly instead of being
 * collected: always in native mode, and in machine mode for format-aware ksc-*
 * children, which render machine output themselves.
 */
function shouldPassThrough(command: Command, format: OutputFormat): boolean {
	if (format === 'native') {
		return true
	}

	return (
		format === 'machine' &&
		!isCommandFunction(command) &&
		!isCommandGroup(command) &&
		command.outputFormatAware === true
	)
}

/**
 * Renders a collected command's diagnostics and unparsed lines in machine
 * format.
 */
function writeMachineOutcome(
	logStream: NodeJS.WritableStream,
	outcome: CommandCollectOutcome,
): void {
	for (const diagnostic of outcome.diagnostics) {
		logStream.write(`${renderMachineDiagnostic(diagnostic)}\n`)
	}

	for (const tool of outcome.tools) {
		for (const line of tool.unparsed) {
			logStream.write(`${line}\n`)
		}
	}
}

/** Result of executing a batch of commands. */
export type ExecuteCommandsResult = {
	exitCode: number
	/** Present only when `format` is `json`. */
	report: LintReport | undefined
}

export type ExecuteCommandsOptions = {
	/** Enable built-in caches declared by individual tools. */
	cache?: boolean
	/** Maximum number of leaf jobs running at once across the whole command tree. */
	concurrency?: number
	/** Diagnostic output format. */
	format?: OutputFormat
	/** Run commands within a stage concurrently. */
	parallel?: boolean
}

/** Default shared worker budget for lint and fix commands. */
function getDefaultConcurrency(): number {
	return Math.min(4, availableParallelism())
}

/** A small FIFO semaphore shared by every leaf command in a command tree. */
class CommandScheduler {
	public readonly concurrency: number
	private active = 0
	private readonly queue: Array<() => void> = []

	public constructor(concurrency: number) {
		this.concurrency = concurrency
	}

	public async run<T>(job: () => Promise<T>): Promise<T> {
		if (this.active >= this.concurrency) {
			await new Promise<void>((resolve) => {
				this.queue.push(resolve)
			})
		}

		this.active += 1
		try {
			return await job()
		} finally {
			this.active -= 1
			this.queue.shift()?.()
		}
	}
}

async function prepareExecution(options: ExecuteCommandsOptions): Promise<{
	cache: boolean
	scheduler: CommandScheduler
}> {
	const cache = options.cache ?? false
	const concurrency = options.concurrency ?? getDefaultConcurrency()
	if (!Number.isInteger(concurrency) || concurrency < 1) {
		throw new Error('Concurrency must be a positive integer.')
	}

	if (cache) {
		await fse.ensureDir(path.join(getWorkspaceRoot(), 'node_modules', '.cache', 'ksc'))
	}

	return { cache, scheduler: new CommandScheduler(concurrency) }
}

type CommandExecutionOutcome = {
	diagnostics: Diagnostic[]
	exitCode: number
	machineOutcomes: CommandCollectOutcome[]
	name: string
	tools: ToolRun[]
}

type CommandExecutionContext = {
	cache: boolean
	format: OutputFormat
	logStream: NodeJS.WritableStream
	nativeVerbose: boolean | undefined
	optionFlags: string[]
	positionalArguments: string[]
	scheduler: CommandScheduler
}

function resolveGroupPositionalArguments(
	group: CommandGroup,
	positionalArguments: string[],
): string[] {
	if (group.positionalArgumentMode === 'none') {
		return []
	}

	if (positionalArguments.length > 0) {
		return positionalArguments
	}

	return group.positionalArgumentDefault === undefined ? [] : [group.positionalArgumentDefault]
}

function createGroupLogStream(
	logStream: NodeJS.WritableStream,
	group: CommandGroup,
): NodeJS.WritableStream {
	if (group.logPrefix === undefined) {
		return logStream
	}

	const groupStream = createStreamTransform(group.logPrefix, group.logColor)
	groupStream.pipe(logStream)
	return groupStream
}

function getResolvedCommandName(command: Command): string {
	if (isCommandGroup(command)) {
		return `${command.name} ${command.subcommand}`
	}

	if (!isCommandFunction(command) && command.subcommands !== undefined) {
		return [command.name, ...command.subcommands].join(' ')
	}

	return command.name
}

async function executeCommand(
	command: Command,
	context: CommandExecutionContext,
): Promise<CommandExecutionOutcome> {
	if (isCommandGroup(command)) {
		const groupLogStream = createGroupLogStream(context.logStream, command)
		try {
			const commands = await resolveCommands(command.commands)

			if (context.nativeVerbose) {
				const displayArguments = [command.subcommand, ...context.positionalArguments].join(' ')
				const resolvedCommands = command.showResolvedCommands
					? ` (${commands.map((nestedCommand) => getResolvedCommandName(nestedCommand)).join(', ')})`
					: ''
				context.logStream.write(
					`Running: "${command.name} ${displayArguments}"${resolvedCommands}\n`,
				)
			}

			const outcomes = await executeCommandPlan(
				commands,
				{
					...context,
					logStream: groupLogStream,
					nativeVerbose: command.verbose,
					positionalArguments: resolveGroupPositionalArguments(
						command,
						context.positionalArguments,
					),
				},
				command.parallel === true,
			)

			return {
				diagnostics: outcomes.flatMap(({ diagnostics }) => diagnostics),
				exitCode: outcomes.every(({ exitCode }) => exitCode === 0) ? 0 : 1,
				machineOutcomes: outcomes.flatMap(({ machineOutcomes }) => machineOutcomes),
				name: command.name,
				tools: outcomes.flatMap(({ tools }) => tools),
			}
		} catch (error) {
			const message = String(error)
			const failureTool = {
				durationMs: 0,
				exitCode: 1,
				name: command.name,
				unparsed: [message],
			}

			if (context.format === 'native') {
				groupLogStream.write(`${message}\n`)
			}

			return {
				diagnostics: [],
				exitCode: 1,
				machineOutcomes: [{ diagnostics: [], exitCode: 1, tools: [failureTool] }],
				name: command.name,
				tools: [failureTool],
			}
		}
	}

	return context.scheduler.run(async () => {
		if (shouldPassThrough(command, context.format)) {
			const exitCode = await (isCommandFunction(command)
				? executeFunctionCommand(
						context.logStream,
						context.positionalArguments,
						context.optionFlags,
						command,
						context.nativeVerbose,
					)
				: executeCliCommand(
						context.logStream,
						context.positionalArguments,
						context.optionFlags,
						command,
						context.cache,
						context.nativeVerbose,
					))

			return {
				diagnostics: [],
				exitCode,
				machineOutcomes: [],
				name: command.name,
				tools: [],
			}
		}

		const outcome = await collectCommand(
			context.logStream,
			context.positionalArguments,
			context.optionFlags,
			command,
			context.cache,
		)
		return {
			diagnostics: outcome.diagnostics,
			exitCode: outcome.exitCode,
			machineOutcomes: [outcome],
			name: command.name,
			tools: outcome.tools,
		}
	})
}

/**
 * Execute stage barriers in order while retaining original result ordering. A
 * concurrency of one intentionally takes the wholly serial path so it also
 * restores deterministic command start order.
 */
async function executeCommandPlan(
	commands: Command[],
	context: CommandExecutionContext,
	parallel: boolean,
): Promise<CommandExecutionOutcome[]> {
	if (!parallel || context.scheduler.concurrency === 1) {
		const outcomes: CommandExecutionOutcome[] = []
		for (const command of commands) {
			outcomes.push(await executeCommand(command, context))
		}

		return outcomes
	}

	// Let sibling groups enqueue their first leaf before this parallel group
	// fills the shared FIFO. This prevents a wide group such as Mdat from
	// monopolizing every worker ahead of otherwise independent tools.
	await Promise.resolve()

	const stages = new Map<number, Array<{ command: Command; index: number }>>()
	for (const [index, command] of commands.entries()) {
		const stage = command.stage ?? 0
		const entries = stages.get(stage) ?? []
		entries.push({ command, index })
		stages.set(stage, entries)
	}

	const indexedOutcomes: Array<CommandExecutionOutcome | undefined> = Array.from({
		length: commands.length,
	})
	const orderedStages = stages
		.keys()
		.toArray()
		.toSorted((a, b) => a - b)
	for (const stage of orderedStages) {
		const entries = stages.get(stage) ?? []
		const outcomes = await Promise.all(
			entries.map(async ({ command, index }) => ({
				index,
				outcome: await executeCommand(command, context),
			})),
		)
		for (const { index, outcome } of outcomes) {
			indexedOutcomes[index] = outcome
		}
	}

	return indexedOutcomes.filter(
		(outcome): outcome is CommandExecutionOutcome => outcome !== undefined,
	)
}

/**
 * Partitions commands into run / skip lists based on `--skip` values, warning
 * about values that match no command.
 */
function partitionSkippedCommands(
	logStream: NodeJS.WritableStream,
	commands: Command[],
	skip: string[],
): { commandsToRun: Command[]; skippedCommands: Command[] } {
	const commandsToRun: Command[] = []
	const skippedCommands: Command[] = []

	for (const command of commands) {
		if (skip.length > 0 && skip.includes(normalizeCommandName(command.name))) {
			skippedCommands.push(command)
		} else {
			commandsToRun.push(command)
		}
	}

	// Warn about unrecognized --skip values
	if (skip.length > 0) {
		const matchedNames = new Set(skippedCommands.map((c) => normalizeCommandName(c.name)))
		const unmatchedSkips = skip.filter((s) => !matchedNames.has(s))
		if (unmatchedSkips.length > 0) {
			const availableNames = commands.map((c) => normalizeCommandName(c.name)).join(', ')
			logStream.write(
				`⚠️  ${getColors().yellow(`Unrecognized --skip ${pluralize('value', unmatchedSkips.length)}: ${unmatchedSkips.join(', ')}. Available: ${availableNames}`)}\n`,
			)
		}
	}

	return { commandsToRun, skippedCommands }
}

/**
 * Execute multiple commands (functions, CLIs, or nested command groups) under
 * one worker budget. Machine and JSON results are emitted in declaration order
 * even when the underlying checks finish out of order.
 */
export async function executeCommands(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
	optionFlags: string[],
	commands: Command[],
	verbose?: boolean,
	showSummary?: boolean,
	skip?: string[],
	formatOrOptions: ExecuteCommandsOptions | OutputFormat = 'native',
): Promise<ExecuteCommandsResult> {
	const options = typeof formatOrOptions === 'string' ? {} : formatOrOptions
	const format =
		typeof formatOrOptions === 'string' ? formatOrOptions : (options.format ?? 'native')
	const { commandsToRun, skippedCommands } = partitionSkippedCommands(
		logStream,
		commands,
		skip ?? [],
	)

	// The verbose "Running:" lines are human-facing chrome, shown in native format only
	const nativeVerbose = format === 'native' ? verbose : false
	const { cache, scheduler } = await prepareExecution(options)

	const outcomes = await executeCommandPlan(
		commandsToRun,
		{
			cache,
			format,
			logStream,
			nativeVerbose,
			optionFlags,
			positionalArguments,
			scheduler,
		},
		options.parallel === true,
	)
	const exitCodes = outcomes.map(({ exitCode, name }) => ({ exitCode, name }))
	const toolRuns = outcomes.flatMap(({ tools }) => tools)
	const diagnostics = outcomes.flatMap(({ diagnostics }) => diagnostics)

	if (format === 'machine') {
		for (const outcome of outcomes) {
			for (const machineOutcome of outcome.machineOutcomes) {
				writeMachineOutcome(logStream, machineOutcome)
			}
		}
	}

	// Total includes skipped for consistent denominator across all summary lines
	const totalCommands = commands.length

	// Skipped feedback and success / failure summaries are human-facing chrome,
	// shown in native format only
	// Always show skipped feedback when tools were skipped, even if showSummary is false
	const colors = getColors()

	if (format === 'native' && skippedCommands.length > 0) {
		const skippedNames = skippedCommands.map(({ name }) => name)
		const skippedSummary = colors.bold(
			`${skippedNames.length} / ${totalCommands} ${pluralize('Command', skippedNames.length)} Skipped:`,
		)
		logStream.write(`⏭️ ${colors.dim(skippedSummary)} ${colors.dim(skippedNames.join(', '))}\n`)
	}

	if (format === 'native' && showSummary) {
		const successfulCommands = exitCodes
			.filter(({ exitCode }) => exitCode === 0)
			.map(({ name }) => name)
		const failedCommands = exitCodes
			.filter(({ exitCode }) => exitCode !== 0)
			.map(({ name }) => name)

		if (successfulCommands.length > 0) {
			const successSummary = colors.bold(
				`${successfulCommands.length} / ${totalCommands} ${pluralize('Command', successfulCommands.length)} Succeeded:`,
			)
			logStream.write(
				`✅ ${colors.green(successSummary)} ${colors.green(successfulCommands.join(', '))}\n`,
			)
		}

		if (failedCommands.length > 0) {
			const failedSummary = colors.bold(
				`${failedCommands.length} / ${totalCommands} ${pluralize('Command', failedCommands.length)} Failed:`,
			)
			logStream.write(`❌ ${colors.red(failedSummary)} ${colors.red(failedCommands.join(', '))}\n`)
		}
	}

	// Return zero if all zero, otherwise return 1
	return {
		exitCode: exitCodes.every(({ exitCode }) => exitCode === 0) ? 0 : 1,
		report: format === 'json' ? createLintReport(toolRuns, diagnostics) : undefined,
	}
}

/** Find the init directory belonging to the package that contains a built CLI. */
export async function findInitDirectory(moduleDirectory: string): Promise<string | undefined> {
	const sourcePackage = await packageUp({ cwd: moduleDirectory })
	return sourcePackage === undefined ? undefined : path.join(path.dirname(sourcePackage), 'init')
}

async function copyAndMergeInitFiles(
	logStream: NodeJS.WritableStream,
	location: string | undefined,
	configFile: string | undefined,
	configPackageJson: Record<string, unknown> | undefined,
): Promise<number> {
	// By default, copies files in script package's /init directory to the root of the package it's called from
	// For files in .vscode, if both the source and destination files are json, then merge them instead of overwriting

	// Copy files
	const destinationPackage = await packageUp()
	if (destinationPackage === undefined) {
		throw new Error('The `init` command must be used in a directory with a package.json file')
	}

	const source = await findInitDirectory(import.meta.dirname)
	if (source === undefined) {
		logStream.write('Error: Could not locate the package containing this CLI.\n')
		return 1
	}

	const destination = path.dirname(destinationPackage)

	const hasConfigLocationOption =
		(location === 'file' || location === 'package') &&
		configFile !== undefined &&
		configPackageJson !== undefined

	try {
		if (hasConfigLocationOption) {
			const configKey = Object.keys(configPackageJson)[0]

			const destinationPackageJson = fse.readJsonSync(destinationPackage) as Record<string, unknown>

			if (location === 'package') {
				// Merge json into package.json
				logStream.write(
					`Merging: \nPackage config key "${configKey}" → "${destination}" (Because --location is set to "package")\n`,
				)
				const mergedPackageJson = merge(destinationPackageJson, configPackageJson)
				fse.writeJSONSync(destinationPackage, mergedPackageJson, { spaces: '\t' })
				await formatFileInPlace(destinationPackage)
			} else if (
				configKey !== undefined &&
				Object.keys(destinationPackageJson).includes(configKey)
			) {
				// Removing configuration key from package.json
				logStream.write(
					`Deleting: \nPackage config key "${configKey}" in "${destination}" (Because --location is set to "file")\n`,
				)
				// eslint-disable-next-line ts/no-dynamic-delete
				delete destinationPackageJson[configKey]
				fse.writeJSONSync(destinationPackage, destinationPackageJson, { spaces: '\t' })
				await formatFileInPlace(destinationPackage)
			}
		}

		// Make sure there's stuff to copy from init before proceeding
		const sourceExists = await fse.pathExists(source)
		if (!sourceExists) {
			return 0
		}

		const sourceFiles = await fse.readdir(source)
		if (sourceFiles.length === 0) {
			logStream.write(`Source directory "${source}" is empty.\n`)
			return 0
		}

		logStream.write(`Adding initial configuration files from:\n"${source}" → "${destination}"\n`)

		await fse.copy(source, destination, {
			async filter(sourcePath, destinationPath) {
				const isFile = fs.statSync(sourcePath).isFile()
				const destinationExists = fs.existsSync(destinationPath)

				if (isFile) {
					// Special case to skip copying config files to root if --location is set to package
					if (
						hasConfigLocationOption &&
						location === 'package' &&
						sourcePath.includes(configFile)
					) {
						if (destinationExists) {
							logStream.write(
								`Deleting: \n"${sourcePath}" → "${destinationPath}" (Because --location is set to "package")\n`,
							)

							fse.removeSync(destinationPath)
						} else {
							logStream.write(
								`Skipping: \n"${sourcePath}" → "${destinationPath}" (Because --location is set to "package")\n`,
							)
						}

						return false
					}

					// Special case to merge package.json and .vscode json settings files
					if (
						destinationExists &&
						(destinationPath.includes('.vscode/') || destinationPath.includes('package.json')) &&
						path.extname(destinationPath) === '.json'
					) {
						// Merge
						logStream.write(`Merging: \n"${sourcePath}" → "${destinationPath}"\n`)

						const sourceJson = fse.readJSONSync(sourcePath) as Record<string, unknown>
						const destinationJson = fse.readJSONSync(destinationPath) as Record<string, unknown>
						// Tasks are merged by label to avoid splicing unrelated tasks together
						const mergedJson = destinationPath.endsWith('.vscode/tasks.json')
							? mergeVsCodeTasks(destinationJson, sourceJson)
							: merge(destinationJson, sourceJson)

						fse.writeJSONSync(destinationPath, mergedJson, { spaces: '\t' })
						await formatFileInPlace(destinationPath)

						return false
					}

					if (destinationExists) {
						logStream.write(`Overwriting: \n"${sourcePath}" → "${destinationPath}"\n`)
						await formatFileInPlace(destinationPath)
						return true
					}

					logStream.write(`Copying: \n"${sourcePath}" → "${destinationPath}"\n`)
					await formatFileInPlace(destinationPath)
					return true
				}

				// Don't log directory copy
				return true
			},
			overwrite: true,
		})
	} catch (error) {
		console.error(String(error))
		return 1
	}

	return 0
}

/**
 * Create a simple command line interface for a package.
 */
export async function buildCommands(commandDefinition: CommandDefinition) {
	const {
		commands: { fix, init, lint, printConfig },
		description,
		logColor,
		logPrefix,
		name,
		showSummary,
		verbose,
	} = commandDefinition

	// Must happen before any output streams are created so prefixes are
	// suppressed consistently, and before yargs parses so the env var
	// propagates to spawned ksc-* subprocesses
	detectAndSetOutputFormat()

	// Set up log stream. In JSON mode stdout is reserved for the report, so
	// human-facing progress goes to stderr.
	const logStream = createStreamTransform(logPrefix, logColor)
	logStream.pipe(getLogDestination())

	const yargsInstance = yargs(hideBin(process.argv))
		.scriptName(name)
		.usage('$0 <command>', description)

	if (init !== undefined) {
		yargsInstance.command({
			builder(yargsBuilder) {
				const y = init.locationOptionFlag
					? yargsBuilder.option('location', {
							choices: ['file', 'package'],
							default: 'file',
							describe: 'Where to store the configuration.',
							type: 'string',
						})
					: yargsBuilder
				return showSummary ? addSkipOption(y) : y
			},
			command: 'init',
			// Command: init.locationOptionFlag ? 'init [--location]' : 'init',
			describe:
				init.description ??
				`Initialize by copying starter config files to your project root${init.locationOptionFlag ? ' or to your package.json file.' : '.'}`,
			async handler(argv) {
				// Copy files

				const location = init.locationOptionFlag ? (argv.location as string | undefined) : undefined

				const skip = normalizeSkipValues(argv.skip as string[] | undefined)

				// Grab context by closure
				const copyAndMergeInitFilesCommand: CommandFunction = {
					async execute(commandLogStream, _, optionFlags) {
						return copyAndMergeInitFiles(
							commandLogStream,
							optionFlags.at(1),
							init.configFile,
							init.configPackageJson,
						)
					},
					name: 'copyAndMergeInitFiles',
				}

				// Run commands
				const { exitCode } = await executeCommands(
					logStream,
					[],
					location === undefined ? [] : ['--location', location],
					[copyAndMergeInitFilesCommand, ...(init.commands ?? [])],
					undefined,
					undefined,
					skip,
				)

				process.exitCode = exitCode
			},
		})
	}

	if (lint !== undefined) {
		yargsInstance.command({
			builder(yargsBuilder) {
				const y = addCacheOption(
					addFormatOption(
						lint.positionalArgumentMode === 'none'
							? yargsBuilder
							: yargsBuilder.positional('files', {
									array: true,
									...(lint.positionalArgumentDefault !== undefined && {
										default: lint.positionalArgumentDefault,
									}),
									describe: 'Files or glob pattern to lint.',
									type: 'string',
								}),
					),
				)
				return showSummary ? addSkipOption(y) : y
			},
			command:
				lint.positionalArgumentMode === 'none'
					? 'lint'
					: lint.positionalArgumentMode === 'optional'
						? 'lint [files..]'
						: 'lint <files..>',
			describe: lint.description,
			async handler(argv) {
				const positionalArguments = (argv.files as string[] | undefined) ?? []

				const skip = normalizeSkipValues(argv.skip as string[] | undefined)
				// The environment variable is the source of truth: it's set by the
				// pre-parse argv sniff and inherited from parent ksc processes
				const format = getOutputFormat()
				const { exitCode, report } = await executeCommands(
					logStream,
					positionalArguments,
					[],
					await resolveCommands(lint.commands),
					verbose,
					showSummary,
					skip,
					{
						cache: argv.cache,
						format,
						parallel: lint.parallel,
					},
				)

				if (report !== undefined) {
					// Final JSON output for lint commands
					process.stdout.write(`${stringify(report)}\n`)
				}

				process.exitCode = exitCode
			},
		})
	}

	// Duplicative of above, but whatever
	if (fix !== undefined) {
		yargsInstance.command({
			builder(yargsBuilder) {
				const y = addCacheOption(
					addFormatOption(
						fix.positionalArgumentMode === 'none'
							? yargsBuilder
							: yargsBuilder.positional('files', {
									array: true,
									...(fix.positionalArgumentDefault !== undefined && {
										default: fix.positionalArgumentDefault,
									}),
									describe: 'Files or glob pattern to fix.',
									type: 'string',
								}),
					),
				)
				return showSummary ? addSkipOption(y) : y
			},
			command:
				fix.positionalArgumentMode === 'none'
					? 'fix'
					: fix.positionalArgumentMode === 'optional'
						? 'fix [files..]'
						: 'fix <files..>',
			describe: fix.description,
			async handler(argv) {
				const positionalArguments = (argv.files as string[] | undefined) ?? []

				const skip = normalizeSkipValues(argv.skip as string[] | undefined)
				// The environment variable is the source of truth: it's set by the
				// pre-parse argv sniff and inherited from parent ksc processes
				const format = getOutputFormat()
				const { exitCode, report } = await executeCommands(
					logStream,
					positionalArguments,
					[],
					await resolveCommands(fix.commands),
					undefined,
					undefined,
					skip,
					{
						cache: argv.cache,
						format,
						parallel: fix.parallel,
					},
				)

				if (report !== undefined) {
					// Final JSON output for fix commands
					process.stdout.write(`${stringify(report)}\n`)
				}

				process.exitCode = exitCode
			},
		})
	}

	if (printConfig !== undefined) {
		yargsInstance.command({
			builder(yargsBuilder) {
				const y =
					printConfig.positionalArgumentMode === 'none'
						? yargsBuilder
						: yargsBuilder.positional('file', {
								...(printConfig.positionalArgumentDefault !== undefined && {
									default: printConfig.positionalArgumentDefault,
								}),
								describe: 'File or glob pattern to print configuration for.',
								type: 'string',
							})
				return showSummary ? addSkipOption(y) : y
			},
			command:
				printConfig.positionalArgumentMode === 'none'
					? 'print-config'
					: printConfig.positionalArgumentMode === 'optional'
						? 'print-config [file]'
						: 'print-config <file>',
			describe: printConfig.description,
			async handler(argv) {
				const fileArgument = (argv.file as string | undefined) ?? undefined
				const positionalArguments = fileArgument === undefined ? [] : [fileArgument]

				const skip = normalizeSkipValues(argv.skip as string[] | undefined)

				const { exitCode } = await executeCommands(
					logStream,
					positionalArguments,
					[],
					await resolveCommands(printConfig.commands),
					verbose,
					showSummary,
					skip,
				)
				process.exitCode = exitCode
			},
		})
	}

	// Parse and execute
	yargsInstance.alias('h', 'help')
	yargsInstance.version(version)
	yargsInstance.alias('v', 'version')
	yargsInstance.help()
	yargsInstance.wrap(process.stdout.isTTY ? Math.min(120, yargsInstance.terminalWidth()) : 0)

	await yargsInstance.parseAsync()
}

/**
 * Create a command that loads and prints a tool's cosmiconfig-based
 * configuration.
 */
export function getCosmiconfigCommand(configName: string): CommandFunction {
	return {
		async execute(logStream) {
			const result = await getCosmiconfigResult(configName)

			if (result === undefined) {
				return 1
			}

			// eslint-disable-next-line ts/no-unsafe-assignment
			const { config, filepath: configFilepath, isEmpty } = result

			logStream.write(`Found ${configName} configuration at "${configFilepath}"\n`)

			if (isEmpty) {
				logStream.write('Configuration is empty.\n')
				return 0
			}

			const prettyAndColorfulJsonLines = stringify(config).split('\n')
			for (const line of prettyAndColorfulJsonLines) {
				logStream.write(`${line}\n`)
			}

			return 0
		},
		name: `Cosmiconfig ${configName}`,
	}
}

// eslint-disable-next-line ts/no-restricted-types
type NullToUndefined<T> = T extends null ? undefined : T

/**
 * Convenience wrapper to safely fetch a cosmiconfig result.
 */
export async function getCosmiconfigResult(
	configName: string,
): Promise<NullToUndefined<CosmiconfigResult>> {
	const explorer = cosmiconfig(configName, {
		loaders: {
			// Using the alternate typescript loader fixes ERR_MODULE_NOT_FOUND errors
			// in configuration files that import modules via a path. Cosmiconfig 10's
			// default .ts loader relies on Node's native type stripping, which still
			// can't resolve those imports (and rejects non-erasable syntax), so the
			// dedicated loader remains necessary.
			// https://github.com/cosmiconfig/cosmiconfig/issues/345
			// https://github.com/Codex-/cosmiconfig-typescript-loader
			// Same approach taken in mdat's implementation...
			'.ts': typeScriptLoader(),
		},
		searchStrategy: 'project',
		// Alt approach?
		// searchStrategy: 'global',
		// stopDir: getCwdOverride('workspace-root'),
	})

	try {
		const result = await explorer.search()

		if (result === null) {
			console.error(`No ${configName} configuration found.`)
			return undefined
		}

		return result
	} catch (error) {
		console.error(`Error while searching for ${configName} configuration:`, error)
		return undefined
	}
}

/**
 * Commonly reused CLI help description strings. Some duplication is intentional
 * for future flexibility.
 */
export const DESCRIPTION = {
	fileRun: 'Matches files below the current working directory by default.',
	monorepoRun:
		'In a monorepo, it will also run in all packages below the current working directory.',
	monorepoSearch: 'Searches up to the root of a monorepo if necessary.',
	multiArgumentCaveat:
		'Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package scope.',
	multiOptionCaveat:
		'Will use option flags where possible if provided, but some of the invoked tools will ignore them.',
	optionalFileRun: 'Package-scoped by default, file-scoped if a file argument is provided.',
	packageRun: 'Package-scoped.',
	packageSearch: 'Package-scoped.',
}
