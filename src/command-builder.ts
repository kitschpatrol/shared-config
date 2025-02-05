#!/usr/bin/env node

/* eslint-disable import/no-named-as-default-member */

import type internal from 'node:stream'
// eslint-disable-next-line unicorn/import-style
import chalk, { type foregroundColorNames } from 'chalk'
import { execa } from 'execa'
// eslint-disable-next-line import/default
import fse from 'fs-extra'
import fs from 'node:fs'
import path from 'node:path'
import { PassThrough } from 'node:stream'
import { fileURLToPath } from 'node:url'
import { packageUp } from 'package-up'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { version } from '../package.json'
import { isErrorExecaError } from './execa-utils.js'
import { merge, stringify } from './json-utils.js'
import { type CwdOverrideOptions, getCwdOverride } from './path-utils.js'
import { createStreamTransform, streamToString } from './stream-utils.js'
import { pluralize } from './string-utils.js'

type ChalkColor = (typeof foregroundColorNames)[number]

type CommandCommon = {
	/** Customizes color of log prefix string. Default color used if undefined. */
	logColor?: ChalkColor
	/** Enables a string prefix in the log output.  False if undefined. */
	logPrefix?: string
	/** CLI command name to execute, or function name to be used in logs */
	name: string
}

type CommandFunction = CommandCommon & {
	execute: (
		logStream: NodeJS.WritableStream,
		positionalArguments: string[], // Passed by default, but can be ignored in implementation
		optionFlags: string[], // Passed by default, but can be ignored in implementation
	) => Promise<number>
}

export type CommandCli = CommandCommon & {
	/** Optionally change the context where the command is executed. Defaults to `process.cwd()` if undefined. */
	cwdOverride?: CwdOverrideOptions
	/** Command-local fixed option flags. */
	optionFlags?: string[]
	/** Command-local fixed positional arguments. */
	positionalArguments?: string[]
	/** Formats and colorizes output if JSON. False if undefined. */
	prettyJsonOutput?: boolean
	/** If true, option flags are passed in from the parent command. False if undefined. */
	receiveOptionFlags?: boolean
	/** If true, positional arguments are passed in from the parent command. False if undefined. */
	receivePositionalArguments?: boolean
	/** Comes immediately after the command */
	subcommands?: string[]
}

type Command = CommandCli | CommandFunction

// Init
// Optionally takes --location option flag
type InitCommand = {
	/** Optional additional commands to run */
	commands?: Command[]
	/** Specific config file */
	configFile?: string
	configPackageJson?: Record<string, unknown>
	locationOptionFlag: boolean
}

// Lint
// Optionally takes files (plural) positional arguments (array of strings, possibly expanded from glob?)
type LintCommand = {
	commands: Command[]
	description: string
	positionalArgumentDefault?: string // only applies if arguments mode is not 'none'
	positionalArgumentMode: 'none' | 'optional' | 'required'
}

// Fix
// Same as lint for now
type FixCommand = LintCommand

// Print Config
// Optionally takes file (singular) positional argument
type PrintConfigCommand = {
	commands: Command[]
	description: string
	positionalArgumentDefault?: string
	positionalArgumentMode: 'none' | 'optional' | 'required'
}

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
	logColor: ChalkColor
	logPrefix: string | undefined
	name: string
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

	if (verbose) {
		targetStream.write(chalk.bold(`Running: "${command.name}()"`))
	}

	try {
		exitCode = await command.execute(targetStream, positionalArguments, optionFlags)
	} catch (error) {
		console.error(String(error))
		exitCode = 1
	}

	return exitCode
}

async function executeCliCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
	optionFlags: string[],
	command: CommandCli,
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

	const resolvedSubcommands = command.subcommands ?? []

	const resolvedPositionalArguments = [
		...(command.receivePositionalArguments ? positionalArguments : []),
		...(command.positionalArguments ?? []),
	]
	const resolvedOptionFlags = [
		...(command.receiveOptionFlags ? optionFlags : []),
		...(command.optionFlags ?? []),
	]

	const resolvedArguments = [
		...resolvedSubcommands,
		...resolvedOptionFlags,
		...resolvedPositionalArguments,
	]

	// Manage current working directory
	const cwd = getCwdOverride(command.cwdOverride)

	if (verbose) {
		targetStream.write(`Running: "${command.name} ${resolvedArguments.join(' ')}"`)
	}

	const cliTargetStream: NodeJS.WritableStream = command.prettyJsonOutput
		? new PassThrough()
		: targetStream

	try {
		const subprocess = execa(command.name, resolvedArguments, {
			cwd,
			env:
				process.env.NO_COLOR === undefined
					? {
							// eslint-disable-next-line ts/naming-convention
							FORCE_COLOR: 'true',
						}
					: {},
			preferLocal: true,
			reject: false, // Prevents throwing on non-zero exit code
			stdin: 'inherit',
		})

		// End false is required here, otherwise the stream will close before the subprocess is done
		subprocess.stdout.pipe(cliTargetStream, { end: false })
		subprocess.stderr.pipe(cliTargetStream, { end: false })

		await subprocess

		// if (debug) {
		// 	console.log(`Executed:   ${subprocess.spawnargs.join(' ')}`)
		// 	console.log(`Exit Code:  ${subprocess.exitCode}`)
		// 	console.log(`Actual CWD: ${process.cwd()}`)
		// 	console.log(`Active CWD: ${cwd}`)
		// }

		if (command.prettyJsonOutput) {
			cliTargetStream.end()
			// TODO is this a bad cast?
			const jsonString = await streamToString(cliTargetStream as unknown as internal.Stream)
			const prettyAndColorfulJson = stringify(JSON.parse(jsonString))

			targetStream.write(prettyAndColorfulJson)
			targetStream.write('\n')
		}

		exitCode = subprocess.exitCode ?? 1
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

/**
 * Execute multiple commands (either functions or command line) in serial
 */
export async function executeCommands(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
	optionFlags: string[],
	commands: Command[],
	verbose?: boolean,
	showSummary?: boolean,
): Promise<number> {
	const exitCodes: Array<{ exitCode: number; name: string }> = []

	for (const command of commands) {
		const exitCode = await (isCommandFunction(command)
			? executeFunctionCommand(logStream, positionalArguments, optionFlags, command, verbose)
			: executeCliCommand(logStream, positionalArguments, optionFlags, command, verbose))

		exitCodes.push({ exitCode, name: command.name })
	}

	if (showSummary) {
		const successfulCommands = exitCodes
			.filter(({ exitCode }) => exitCode === 0)
			.map(({ name }) => name)
		const failedCommands = exitCodes
			.filter(({ exitCode }) => exitCode !== 0)
			.map(({ name }) => name)
		const totalCommands = exitCodes.length

		if (successfulCommands.length > 0) {
			logStream.write(
				`✅ ${chalk.green.bold(
					`${successfulCommands.length} / ${totalCommands} ${pluralize('Command', successfulCommands.length)} Succeeded:`,
				)} ${chalk.green(successfulCommands.join(', '))}\n`,
			)
		}

		if (failedCommands.length > 0) {
			logStream.write(
				`❌ ${chalk.red.bold(
					`${failedCommands.length} / ${totalCommands} ${pluralize('Command', failedCommands.length)} Failed:`,
				)} ${chalk.red(failedCommands.join(', '))}\n`,
			)
		}
	}

	// Return zero if all zero, otherwise return 1
	return exitCodes.every(({ exitCode }) => exitCode === 0) ? 0 : 1
}

// const copyAndMergeInitFilesCommand: CommandFunction = {
// 	name: 'copyAndMergeInitFiles',
// 	execute: async (logStream, positionalArguments, optionFlags) => {
// 		const location = positionalArguments[0]
// 		const configFile = positionalArguments[1]
// 		const configPackageJson = positionalArguments[2]

// 		const exitCode = await copyAndMergeInitFiles(logStream, location, configFile, configPackageJson)
// 		return exitCode
// 	}
// }

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

	const sourcePackage = await packageUp({ cwd: fileURLToPath(import.meta.url) })
	if (sourcePackage === undefined) {
		logStream.write('Error: The script being called was not in a package, weird.\n')
		return 1
	}

	const source = path.join(path.dirname(sourcePackage), 'init')
	const destination = path.dirname(destinationPackage)

	const hasConfigLocationOption =
		(location === 'file' || location === 'package') &&
		configFile !== undefined &&
		configPackageJson !== undefined

	logStream.write(`Adding initial configuration files from:\n"${source}" → "${destination}"\n`)

	try {
		if (hasConfigLocationOption) {
			const configKey = Object.keys(configPackageJson)[0]

			if (location === 'package') {
				const destinationPackageJson = fse.readJsonSync(destinationPackage) as Record<
					string,
					unknown
				>

				// Merge json into package.json
				logStream.write(
					`Merging: \nPackage config key "${configKey}" → "${destination}" (Because --location is set to "package")\n`,
				)
				const mergedPackageJson = merge(destinationPackageJson, configPackageJson)
				fse.writeJSONSync(destinationPackage, mergedPackageJson, { spaces: 2 })
			} else {
				// Removing configuration key from package.json
				const destinationPackageJson = fse.readJsonSync(destinationPackage) as Record<
					string,
					unknown
				>

				if (Object.keys(destinationPackageJson).includes(configKey)) {
					logStream.write(
						`Deleting: \nPackage config key "${configKey}" in "${destination}" (Because --location is set to "file")\n`,
					)
					// eslint-disable-next-line ts/no-dynamic-delete
					delete destinationPackageJson[configKey]
					fse.writeJSONSync(destinationPackage, destinationPackageJson, { spaces: 2 })
				}
			}
		}

		await fse.copy(source, destination, {
			filter(source, destination) {
				const isFile = fs.statSync(source).isFile()
				const destinationExists = fs.existsSync(destination)

				if (isFile) {
					// Special case to skip copying config files to root if --location is set to package
					if (hasConfigLocationOption && location === 'package' && source.includes(configFile)) {
						if (destinationExists) {
							logStream.write(
								`Deleting: \n"${source}" → "${destination}" (Because --location is set to "package")\n`,
							)

							fse.removeSync(destination)
						} else {
							logStream.write(
								`Skipping: \n"${source}" → "${destination}" (Because --location is set to "package")\n`,
							)
						}

						return false
					}

					// Special case to merge .vscode json files
					if (
						destinationExists &&
						destination.includes('.vscode/') &&
						path.extname(destination) === '.json'
					) {
						// Merge
						logStream.write(`Merging: \n"${source}" → "${destination}"\n`)

						const sourceJson = fse.readJSONSync(source) as Record<string, unknown>
						const destinationJson = fse.readJSONSync(destination) as Record<string, unknown>
						const mergedJson = merge(destinationJson, sourceJson)

						fse.writeJSONSync(destination, mergedJson, { spaces: 2 })

						return false
					}

					if (destinationExists) {
						logStream.write(`Overwriting: \n"${source}" → "${destination}"\n`)
						return true
					}

					logStream.write(`Copying: \n"${source}" → "${destination}"\n`)
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

	// Set up log stream
	const logStream = createStreamTransform(logPrefix, logColor)
	logStream.pipe(process.stdout)

	const yargsInstance = yargs(hideBin(process.argv))
		.scriptName(name)
		.usage('$0 <command>', description)

	if (init !== undefined) {
		yargsInstance.command({
			builder(yargs) {
				return init.locationOptionFlag
					? yargs.option('location', {
							choices: ['file', 'package'],
							default: 'file',
							describe: 'TK',
							type: 'string',
						})
					: yargs
			},
			command: 'init',
			describe: `Initialize by copying starter config files to your project root${init.locationOptionFlag ? ' or to your package.json file.' : '.'}`,
			async handler(argv) {
				// Copy files
				// Grab context by closure
				const copyAndMergeInitFilesCommand: CommandFunction = {
					async execute(logStream) {
						return copyAndMergeInitFiles(
							logStream,
							init.locationOptionFlag ? (argv.location as string | undefined) : undefined,
							init.configFile,
							init.configPackageJson,
						)
					},
					name: 'copyAndMergeInitFiles',
				}

				// Run commands
				// TODO pass option?
				const exitCode = await executeCommands(
					logStream,
					[],
					[],
					[copyAndMergeInitFilesCommand, ...(init.commands ?? [])],
				)

				process.exit(exitCode)
			},
		})
	}

	if (lint !== undefined) {
		yargsInstance.command({
			builder(yargs) {
				return lint.positionalArgumentMode === 'none'
					? yargs
					: yargs.positional('files', {
							array: true,
							...(lint.positionalArgumentDefault === undefined
								? {}
								: { default: lint.positionalArgumentDefault }),
							describe: 'Files or glob pattern to lint.',
							type: 'string',
						})
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
				const exitCode = await executeCommands(
					logStream,
					positionalArguments,
					[],
					lint.commands,
					verbose,
					showSummary,
				)
				process.exit(exitCode)
			},
		})
	}

	// Duplicative of above, but whatever
	if (fix !== undefined) {
		yargsInstance.command({
			builder(yargs) {
				return fix.positionalArgumentMode === 'none'
					? yargs
					: yargs.positional('files', {
							array: true,
							...(fix.positionalArgumentDefault === undefined
								? {}
								: { default: fix.positionalArgumentDefault }),
							describe: 'Files or glob pattern to fix.',
							type: 'string',
						})
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
				const exitCode = await executeCommands(logStream, positionalArguments, [], fix.commands)
				process.exit(exitCode)
			},
		})
	}

	if (printConfig !== undefined) {
		yargsInstance.command({
			builder(yargs) {
				return printConfig.positionalArgumentMode === 'none'
					? yargs
					: yargs.positional('file', {
							...(printConfig.positionalArgumentDefault === undefined
								? {}
								: { default: printConfig.positionalArgumentDefault }),
							describe: 'Files or glob pattern to TK.',
							type: 'string',
						})
			},
			command:
				printConfig.positionalArgumentMode === 'none'
					? 'print-config'
					: printConfig.positionalArgumentMode === 'optional'
						? 'print-config [file]'
						: 'print-config <file>',
			describe: printConfig.description,
			async handler(argv) {
				const positionalArguments = (argv.files as string[] | undefined) ?? []
				const exitCode = await executeCommands(
					logStream,
					positionalArguments,
					[],
					printConfig.commands,
					verbose,
					showSummary,
				)
				process.exit(exitCode)
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

// Original implementation of print-config
// if (subcommands.printConfig) {
// 	yargsInstance.command({
// 		builder(yargs) {
// 			return yargs.positional('file', {
// 				array: true,
// 				// TODO allow defaults?
// 				default: subcommands.printConfig?.defaultArguments,
// 				describe: 'TODO',
// 				type: 'string',
// 			})
// 		},
// 		command: 'print-config <file>',
// 		describe: 'Print the effective configuration at a certain path.',
// 		async handler(argv) {
// 			const input = argv.file ?? []
// 			process.exit(
// 				await execute(logStream, subcommands.printConfig, input, async (logStream, args) => {
// 					const filePath = args.at(0)

// 					// Brittle, could pass config name to commandBuilder() instead
// 					const configName = command.split('-').at(0)

// 					if (configName === undefined) {
// 						logStream.write(`Error: Could not find or parse config file for ${command}.\n`)
// 						return 1
// 					}

// 					const configSearch = await cosmiconfig(configName).search(filePath)

// 					if (!configSearch?.config) {
// 						logStream.write(`Error: Could not find or parse config file for ${configName}.\n`)
// 						return 1
// 					}

// 					logStream.write(`${logPrefix} config path: "${configSearch.filepath}"\n`)
// 					logStream.write(stringify(configSearch.config))
// 					logStream.write('\n')
// 					return 0
// 				}),
// 			)
// 		},
// 	})
// }
