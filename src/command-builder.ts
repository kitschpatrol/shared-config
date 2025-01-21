#!/usr/bin/env node

// Creates cli bin files for each package
// based on the shared-config field in their package.js

import { PassThrough } from 'node:stream'
// eslint-disable-next-line unicorn/import-style
import { type foregroundColorNames } from 'chalk'
import { cosmiconfig } from 'cosmiconfig'
import { execa, type ExecaError } from 'execa'
import fse from 'fs-extra'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { packageUp } from 'package-up'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { version } from '../package.json'
import { merge, stringify } from './json-utils.js'
import { createStreamTransform, streamToString } from './stream-utils.js'

type ChalkColor = (typeof foregroundColorNames)[number]

type SubcommandFunction = (
	logStream: NodeJS.WritableStream,
	args: string[],
	options: string[],
) => Promise<number>

type Subcommand = {
	command?: string | SubcommandFunction | SubcommandInitConfig
	defaultArguments?: string[]
	options?: string[]
}

type SubcommandInitConfig = {
	configFile?: string
	configPackageJson?: Record<string, unknown>
}

function getInitConfigFields(subcommand: Subcommand): SubcommandInitConfig {
	if (typeof subcommand.command === 'object' && subcommand.command !== null) {
		const { configFile, configPackageJson } = subcommand.command
		return { configFile, configPackageJson }
	}

	return { configFile: undefined, configPackageJson: undefined }
}

export type Subcommands = {
	[key in 'check' | 'fix' | 'init' | 'printConfig']?: Subcommand
}

export async function executeJsonOutput(
	logStream: NodeJS.WritableStream,
	optionCommand: Subcommand,
	input: string[] = [],
): Promise<number> {
	const pass = new PassThrough()
	const exitCode = await execute(pass, optionCommand, input)
	pass.end()

	if (exitCode !== 0) {
		logStream.write('Error printing config.\n')
		return exitCode
	}

	try {
		const configString = await streamToString(pass)
		logStream.write(stringify(JSON.parse(configString)))
		logStream.write('\n')
		return 0
	} catch (error) {
		logStream.write(`Error: ${String(error)}\n`)
		return 1
	}
}

export async function execute(
	logStream: NodeJS.WritableStream,
	subcommand: Subcommand | undefined,
	input: string[] = [],
	defaultImplementation?: SubcommandFunction | undefined,
): Promise<number> {
	let exitCode = 1

	if (subcommand === undefined) {
		// Should be unreachable...
		console.error('No subcommand implementation found.')
		return exitCode
	}

	if (typeof subcommand.command === 'string') {
		try {
			const subprocess = execa(subcommand.command, [...(subcommand.options ?? []), ...input], {
				env:
					process.env.NO_COLOR === undefined
						? {
								// eslint-disable-next-line @typescript-eslint/naming-convention
								FORCE_COLOR: 'true',
							}
						: {},
				stdin: 'inherit',
			})

			// End false is required here, otherwise the stream will close before the subprocess is done
			subprocess.stdout?.pipe(logStream, { end: false })
			subprocess.stderr?.pipe(logStream, { end: false })
			await subprocess
			exitCode = subprocess.exitCode ?? 1
		} catch (error) {
			// Extra debugging...
			// console.error(`${optionCommand.command} failed with error "${error.shortMessage}"`);
			if (isErrorExecaError(error)) {
				exitCode = typeof error.exitCode === 'number' ? error.exitCode : 1
			}
		}

		return exitCode
	}

	if (typeof subcommand.command === 'function') {
		try {
			exitCode = await subcommand.command(logStream, input, subcommand.options ?? [])
		} catch (error) {
			console.error(String(error))
			return 1
		}

		return exitCode
	}

	if (defaultImplementation !== undefined) {
		try {
			exitCode = await defaultImplementation(logStream, input, subcommand.options ?? [])
		} catch (error) {
			console.error(String(error))
			return 1
		}

		return exitCode
	}

	console.error(
		`There is no default implementation for this command. The [tool]-config package must define a command.`,
	)
	return 1
}

// Yargs does this...
// function checkArguments(
// 	input: string[],
// 	optionCommand: Subcommand,
// 	logStream: NodeJS.WritableStream,
// ): void {
// 	// Warn if no default arguments are provided, don't be too clever
// 	if (input.length === 0 && !optionCommand.defaultArguments) {
// 		logStream.write('Error: This command must be used with a file argument\n')
// 		process.exit(1)
// 	}
// }

export async function buildCommands(
	command: string,
	logPrefix: string | undefined,
	logColor: ChalkColor,
	subcommands: Subcommands,
) {
	// Set up log stream
	const logStream = createStreamTransform(logPrefix, logColor)
	logStream.pipe(process.stdout)

	const yargsInstance = yargs(hideBin(process.argv))
		.scriptName(command)
		.usage('$0 <command>', 'Run a command.')
		.strict()

	// Add subcommands based on options
	if (subcommands.check) {
		yargsInstance.command({
			builder(yargs) {
				return yargs.positional('files', {
					array: true,
					default: subcommands.check?.defaultArguments,
					describe: 'Files to check',
					type: 'string',
				})
			},
			command: 'check [files..]',
			describe: 'Check for and report issues.',
			async handler(argv) {
				const input = argv.files ?? []
				process.exit(await execute(logStream, subcommands.check, input))
			},
		})
	}

	if (subcommands.fix) {
		yargsInstance.command({
			builder(yargs) {
				return yargs.positional('files', {
					array: true,
					default: subcommands.fix?.defaultArguments,
					describe: 'Files to fix',
					type: 'string',
				})
			},
			command: 'fix [files..]',
			describe: 'Fix all auto-fixable issues, and report the un-fixable.',
			async handler(argv) {
				const input = argv.files ?? []
				process.exit(await execute(logStream, subcommands.fix, input))
			},
		})
	}

	if (subcommands.init) {
		const { configFile, configPackageJson } = getInitConfigFields(subcommands.init)
		const hasConfigLocationOption = configFile !== undefined && configPackageJson !== undefined

		yargsInstance.command({
			builder(yargs) {
				// Only expose file / package flag if we provided config for it
				return hasConfigLocationOption
					? yargs.option('location', {
							choices: ['file', 'package'],
							default: 'file',
							describe: 'TK',
							type: 'string',
						})
					: yargs
			},
			command: 'init',
			describe: `Initialize by copying starter config files to your project root${hasConfigLocationOption ? 'or to your package.json file.' : '.'}`,
			async handler(argv) {
				// TODO options..

				process.exit(
					await execute(logStream, subcommands.init, [], async (logStream) => {
						// By default, copies files in script package's /init directory to the root of the package it's called from
						// For files in .vscode, if both the source and destination files are json, then merge them instead of overwriting

						// Copy files
						const destinationPackage = await packageUp()
						if (destinationPackage === undefined) {
							logStream.write(
								'Error: The `--init` flag must be used in a directory with a package.json file\n',
							)
							return 1
						}

						const sourcePackage = await packageUp({ cwd: fileURLToPath(import.meta.url) })
						if (sourcePackage === undefined) {
							logStream.write('Error: The script being called was not in a package, weird.\n')
							return 1
						}

						const source = path.join(path.dirname(sourcePackage), 'init/')
						const destination = path.dirname(destinationPackage)

						logStream.write(
							`Adding initial configuration files from:\n"${source}" → "${destination}"\n`,
						)

						try {
							if (hasConfigLocationOption) {
								const configKey = Object.keys(configPackageJson)[0]

								if (argv.location === 'package') {
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
										// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
										delete destinationPackageJson[configKey]
										fse.writeJSONSync(destinationPackage, destinationPackageJson, { spaces: 2 })
									}
								}
							}

							await fse.copy(source, destination, {
								filter(source, destination) {
									const isFile = fse.statSync(source).isFile()
									const destinationExists = fse.existsSync(destination)

									if (isFile) {
										// Special case to skip copying config files to root if --location is set to package
										if (
											hasConfigLocationOption &&
											argv.location === 'package' &&
											source.includes(configFile)
										) {
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
											const destinationJson = fse.readJSONSync(destination) as Record<
												string,
												unknown
											>
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
							console.error(`${String(error)}`)
							return 1
						}

						return 0
					}),
				)
			},
		})
	}

	if (subcommands.printConfig) {
		yargsInstance.command({
			builder(yargs) {
				return yargs.positional('file', {
					array: true,
					// TODO allow defaults?
					default: subcommands.printConfig?.defaultArguments,
					describe: 'TODO',
					type: 'string',
				})
			},
			command: 'print-config <file>',
			describe: 'Print the effective configuration at a certain path.',
			async handler(argv) {
				const input = argv.file ?? []
				process.exit(
					await execute(logStream, subcommands.printConfig, input, async (logStream, args) => {
						const filePath = args?.at(0)

						// Brittle, could pass config name to commandBuilder() instead
						const configName = command.split('-').at(0)

						if (configName === undefined) {
							logStream.write(`Error: Could not find or parse config file for ${command}.\n`)
							return 1
						}

						const configSearch = await cosmiconfig(configName).search(filePath)

						if (!configSearch?.config) {
							logStream.write(`Error: Could not find or parse config file for ${configName}.\n`)
							return 1
						}

						logStream.write(`${logPrefix} config path: "${configSearch?.filepath}"\n`)
						logStream.write(stringify(configSearch.config))
						logStream.write('\n')
						return 0
					}),
				)
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

function isErrorExecaError(error: unknown): error is ExecaError {
	return (
		error instanceof Error &&
		'exitCode' in error &&
		typeof (error as ExecaError).exitCode === 'number'
	)
}
