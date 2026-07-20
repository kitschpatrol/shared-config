import fse from 'fs-extra'
import path from 'node:path'
import type {
	CollectContext,
	CollectResult,
	Command,
	CommandDefinition,
} from '../../../src/command-builder.js'
import type { Diagnostic } from '../../../src/diagnostics.js'
import { DESCRIPTION } from '../../../src/command-builder.js'
import { normalizeDiagnosticPath, toOutputLines } from '../../../src/diagnostics.js'
import { getPackageDirectory } from '../../../src/path-utilities.js'

// "src/foo.ts(12,5): error TS2304: Cannot find name 'x'."
const TSC_FILE_DIAGNOSTIC_REGEX =
	/^(?<file>.+?)\((?<line>\d+),(?<column>\d+)\): (?<severity>error|warning) (?<code>TS\d+): (?<message>.*)$/v
// "error TS5083: Cannot read file 'tsconfig.json'."
const TSC_GLOBAL_DIAGNOSTIC_REGEX = /^(?<severity>error|warning) (?<code>TS\d+): (?<message>.*)$/v
const CONTINUATION_LINE_REGEX = /^\s/v

// Human format: the progress lines and the all-clear summary. Passing
// `--output human` would also drop the progress lines, but strips code context
// from real diagnostics, so filter instead. The summary keeps its `====`
// separator, file count, and colors when there's something to report.
const SVELTE_CHECK_HUMAN_NOISE_REGEX =
	/^(?:Loading svelte-check in workspace: |Getting Svelte diagnostics\.\.\.|svelte-check found 0 errors and 0 warnings$)/v

// Machine format, which svelte-check selects itself when CLAUDECODE=1: the
// START line and the all-clear COMPLETED line.
// See https://github.com/sveltejs/language-tools/issues/2868
const SVELTE_CHECK_MACHINE_NOISE_REGEX =
	/^\d+ (?:START "|COMPLETED \d+ FILES 0 ERRORS 0 WARNINGS 0 FILES_WITH_PROBLEMS$)/v

/**
 * True for svelte-check output lines that carry no diagnostic information, so a
 * clean run stays silent.
 */
export function isSvelteCheckNoise(line: string): boolean {
	return SVELTE_CHECK_HUMAN_NOISE_REGEX.test(line) || SVELTE_CHECK_MACHINE_NOISE_REGEX.test(line)
}

/**
 * Parses `tsc --noEmit` text output into diagnostics. Indented lines continue
 * the previous diagnostic's message.
 */
export function parseTscOutput(context: CollectContext): CollectResult {
	const diagnostics: Diagnostic[] = []
	const unparsed: string[] = []

	for (const line of toOutputLines(`${context.stdout}\n${context.stderr}`)) {
		const fileMatch = TSC_FILE_DIAGNOSTIC_REGEX.exec(line)
		if (fileMatch?.groups !== undefined) {
			const { code, column, file, line: lineNumber, message, severity } = fileMatch.groups
			diagnostics.push({
				column: Number(column),
				file: normalizeDiagnosticPath(file ?? '', context.cwd),
				line: Number(lineNumber),
				message: message ?? '',
				rule: code,
				severity: severity === 'warning' ? 'warning' : 'error',
				tool: 'tsc',
			})
			continue
		}

		const globalMatch = TSC_GLOBAL_DIAGNOSTIC_REGEX.exec(line)
		if (globalMatch?.groups !== undefined) {
			const { code, message, severity } = globalMatch.groups
			diagnostics.push({
				message: message ?? '',
				rule: code,
				severity: severity === 'warning' ? 'warning' : 'error',
				tool: 'tsc',
			})
			continue
		}

		const previousDiagnostic = diagnostics.at(-1)
		if (previousDiagnostic !== undefined && CONTINUATION_LINE_REGEX.test(line)) {
			previousDiagnostic.message += `\n${line.trim()}`
			continue
		}

		unparsed.push(line)
	}

	return { diagnostics, unparsed }
}

/**
 * Returns the names of all dependencies and devDependencies declared in the
 * package's package.json. Declaring a framework-specific type checker like
 * `svelte-check` or `@astrojs/check` is an explicit signal that it's the
 * intended type checker for the project.
 */
async function getDeclaredDependencies(): Promise<Set<string>> {
	const packageDirectory = getPackageDirectory()
	const packageJson = (await fse.readJson(path.join(packageDirectory, 'package.json'))) as {
		dependencies?: Record<string, string>
		devDependencies?: Record<string, string>
	}
	return new Set([
		...Object.keys(packageJson.dependencies ?? {}),
		...Object.keys(packageJson.devDependencies ?? {}),
	])
}

async function generateTypeScriptLintCommands(): Promise<Command[]> {
	// TSC ignores .astro and .svelte files and can't resolve imports of them
	// from plain .ts files, so projects that declare the framework-specific
	// checkers use those instead.
	// See https://github.com/sveltejs/language-tools/issues/2527
	const dependencies = await getDeclaredDependencies()
	const hasAstroCheck = dependencies.has('@astrojs/check')
	const hasSvelteCheck = dependencies.has('svelte-check')

	if (hasAstroCheck || hasSvelteCheck) {
		const commands: Command[] = []
		if (hasAstroCheck) {
			// Covers .astro files plus everything in the project tsconfig
			commands.push({
				cwdOverride: 'package-dir',
				name: 'astro',
				subcommands: ['check'],
			})
		}

		if (hasSvelteCheck) {
			// With --tsconfig, svelte-check covers plain .ts/.js files in addition
			// to .svelte files. When astro check already covers those (Astro
			// project with Svelte islands), only check .svelte files.
			commands.push({
				cwdOverride: 'package-dir',
				name: 'svelte-check',
				optionFlags: hasAstroCheck ? [] : ['--tsconfig', './tsconfig.json'],
				outputFilter: isSvelteCheckNoise,
			})
		}

		return commands
	}

	return [
		{
			collect: {
				parse: parseTscOutput,
			},
			cwdOverride: 'package-dir',
			name: 'tsc',
			optionFlags: ['--noEmit'],
		},
	]
}

export const commandDefinition: CommandDefinition = {
	commands: {
		init: {
			locationOptionFlag: false,
		},
		lint: {
			// Resolved lazily so project detection happens at execution time
			commands: generateTypeScriptLintCommands,
			// TODO confirm monorepo behavior
			description: `Run type checking on your project. ${DESCRIPTION.packageRun} ${DESCRIPTION.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
		printConfig: {
			commands: [
				{
					name: 'tsc',
					optionFlags: ['--showConfig'],
					prettyJsonOutput: true,
				},
			],
			// TODO confirm monorepo behavior
			description: `Print the TypeScript configuration for the project. ${DESCRIPTION.packageSearch} ${DESCRIPTION.monorepoSearch}`,
			positionalArgumentMode: 'none',
		},
	},
	description: "Kitschpatrol's TypeScript shared configuration tools.",
	logColor: 'blueBright',
	logPrefix: '[TypeScript Config]',
	name: 'ksc-typescript',
	order: 3,
}
