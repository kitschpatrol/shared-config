#!/usr/bin/env node

/* eslint-disable import/no-named-as-default-member */

// eslint-disable-next-line unicorn/import-style
import { type foregroundColorNames } from 'chalk'
import { execa } from 'execa'
// eslint-disable-next-line import/default
import fse from 'fs-extra'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { packageUp } from 'package-up'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { version } from '../package.json'
import { merge } from './json-utils.js'
import { type CwdOverrideOptions, getCwdOverride } from './path-utils.js'
import { createStreamTransform } from './stream-utils.js'

type ChalkColor = (typeof foregroundColorNames)[number]

type CommandFunction = (
	logStream: NodeJS.WritableStream,
	positionalArguments: string[], // Passed by default, but can be ignored in implementation
	optionFlags: string[], // Passed by default, but can be ignored in implementation
) => Promise<number>

export type CommandCli = {
	/** Command line program to execute. */
	command: string
	/** Optionally change the context where the command is executed. Defaults to `process.cwd()` if undefined. */
	cwdOverride?: CwdOverrideOptions
	/** Customizes color of log prefix string. Default color used if undefined. */
	logColor?: ChalkColor
	/** Enables a string prefix in the log output.  False if undefined. */
	logPrefix?: string
	/** Command-local fixed option flags. */
	optionFlags?: string[]
	/** Command-local fixed positional arguments. */
	positionalArguments?: string[]
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
	positionalArgumentDefault?: string | undefined
	positionalArgumentMode: 'none' | 'optional' | 'required'
}

export type Subcommands = {
	fix?: FixCommand
	init?: InitCommand
	lint?: LintCommand
	printConfig?: PrintConfigCommand
}

async function executeFunctionCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
	optionFlags: string[],
	command: CommandFunction,
): Promise<number> {
	let exitCode = 1 // Assume failure

	try {
		exitCode = await command(logStream, positionalArguments, optionFlags)
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
	debug = false,
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

	// Manage current working directory
	const cwd = getCwdOverride(command.cwdOverride)

	try {
		const subprocess = execa(
			command.command,
			[...resolvedSubcommands, ...resolvedOptionFlags, ...resolvedPositionalArguments],
			{
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
			},
		)

		// End false is required here, otherwise the stream will close before the subprocess is done
		subprocess.stdout.pipe(targetStream, { end: false })
		subprocess.stderr.pipe(targetStream, { end: false })

		await subprocess

		if (debug) {
			// console.log(subprocess)
			console.log(`Executed:   ${subprocess.spawnargs.join(' ')}`)
			console.log(`Exit Code:  ${subprocess.exitCode}`)
			console.log(`Actual CWD: ${process.cwd()}`)
			console.log(`Active CWD: ${cwd}`)
		}

		exitCode = subprocess.exitCode ?? 1
	} catch (error) {
		// Extra debugging...
		console.error(`${command.command} failed with error:`)
		console.error(error)
		if (isErrorExecaError(error)) {
			exitCode = typeof error.exitCode === 'number' ? error.exitCode : 1
		}
	}

	return exitCode
}

/**
 * TK
 */
export async function executeCommands(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
	optionFlags: string[],
	commands: Command[],
): Promise<number> {
	const exitCodes: number[] = []

	for (const command of commands) {
		const exitCode = await (typeof command === 'function'
			? executeFunctionCommand(logStream, positionalArguments, optionFlags, command)
			: executeCliCommand(logStream, positionalArguments, optionFlags, command))

		exitCodes.push(exitCode)
	}

	// Return zero if all zero, otherwise return 1
	return exitCodes.every((exitCode) => exitCode === 0) ? 0 : 1
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

// Exported for aggregation later
export type CommandDefinition = {
	command: string
	description: string
	logColor: ChalkColor
	logPrefix: string | undefined
	subcommands: Subcommands
}

/**
 * Create a simple command line interface for a package.
 */
export async function buildCommands(commandDefinition: CommandDefinition) {
	const { command, description, logColor, logPrefix, subcommands } = commandDefinition

	// Set up log stream
	const logStream = createStreamTransform(logPrefix, logColor)
	logStream.pipe(process.stdout)

	const yargsInstance = yargs(hideBin(process.argv))
		.scriptName(command)
		.usage('$0 <command>', description)

	const { fix, init, lint } = subcommands

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
				const exitCode = await executeCommands(logStream, positionalArguments, [], lint.commands)
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
				const location = init.locationOptionFlag ? (argv.location as string | undefined) : undefined
				const exitCodes: number[] = []

				// Copy files
				const copyExitCode = await copyAndMergeInitFiles(
					logStream,
					location,
					init.configFile,
					init.configPackageJson,
				)
				exitCodes.push(copyExitCode)

				// Run any other commands
				if (init.commands !== undefined) {
					const commandExitCode = await executeCommands(logStream, [], [], init.commands)
					exitCodes.push(commandExitCode)
				}

				const finalExitCode = exitCodes.every((exitCode) => exitCode === 0) ? 0 : 1

				process.exit(finalExitCode)
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
