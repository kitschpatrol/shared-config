#!/usr/bin/env node
/* eslint-disable complexity */

// Creates cli bin files for each package
// based on the shared-config field in their package.js

import { stringify } from './json-utils.js';
// eslint-disable-next-line unicorn/import-style
import chalk, { type foregroundColorNames } from 'chalk';
import { cosmiconfig } from 'cosmiconfig';
import { execa } from 'execa';
import meow from 'meow';
import type { Flag } from 'meow';
import path from 'node:path';
import { Transform } from 'node:stream';
import { PassThrough, type Stream } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { packageUp } from 'package-up';

// TODO get these from meow?
type StringFlag = Flag<'string', string> | Flag<'string', string[], true>;
type BooleanFlag = Flag<'boolean', boolean> | Flag<'boolean', boolean[], true>;
type NumberFlag = Flag<'number', number> | Flag<'number', number[], true>;
type AnyFlag = BooleanFlag | NumberFlag | StringFlag;
type AnyFlags = Record<string, AnyFlag>;

type ChalkColor = (typeof foregroundColorNames)[number];

type OptionCommand = {
	/** Either a string to run a command, or a function to do something custom. If undefined, a default behavior is used. */
	command?:
		| ((
				/** Useful if you're logging in the function, ensures output is prefixed */
				logStream: NodeJS.WritableStream,
				args: string[],
				options: string[],
		  ) => Promise<number>)
		| string;
	/** Arguments to be passed to the command in the absence of user-provided arguments */
	defaultArguments?: string[];
	/** Options to be passed to the command. The argument is handled in command-builder.ts */
	options?: string[];
};

// Supported options
export type OptionCommands = {
	[key in 'check' | 'fix' | 'init' | 'printConfig']?: OptionCommand;
};

function createStreamTransform(logPrefix: string | undefined, logColor: ChalkColor): Transform {
	return new Transform({
		transform(chunk: Buffer | string, encoding: BufferEncoding, callback) {
			// Convert the chunk to a string and prepend the string to each line
			const lines: string[] = chunk
				.toString()
				.split(/\r?\n/)
				.filter((line) => line.trim().length > 0);

			const transformed =
				lines.map((line) => `${logPrefix ? chalk[logColor](logPrefix) : ''} ${line}`).join('\n') +
				'\n';

			// Pass the transformed data to the next stage in the stream
			this.push(transformed);
			callback();
		},
	});
}

function generateHelpText(command: string, options: OptionCommands): string {
	let helpText = `
  Usage
    $ ${command} [<file|glob> ...]
  `;

	helpText += '\n  Options';

	if (Object.keys(options).length > 0) {
		for (const name of Object.keys(options)) {
			switch (name) {
				case 'init': {
					helpText +=
						'\n    --init, -i                Initialize by copying starter config files to your project root.';
					break;
				}

				case 'check': {
					helpText += `\n    --check, -c               Check for and report issues. Same as ${command}.`;
					break;
				}

				case 'fix': {
					helpText +=
						'\n    --fix, -f                 Fix all auto-fixable issues, and report the un-fixable.';
					break;
				}

				case 'printConfig': {
					helpText +=
						'\n    --print-config, -p <path> Print the effective configuration at a certain path.';
					break;
				}

				case 'help': {
					break;
				}

				case 'version': {
					break;
				}

				default: {
					console.error(`Unknown command name in generateHelpText: ${name}`);
				}
			}
		}
	}

	// Note some spooky behavior around these affecting how options are parsed
	helpText += '\n    --help, -h                Print this help info.';
	helpText += '\n    --version, -v             Print the package version.\n';

	return helpText;
}

function generateFlags(options: OptionCommands): AnyFlags {
	return Object.keys(options).reduce<AnyFlags>((acc, name) => {
		let flagOptions: AnyFlag = {};

		switch (name) {
			case 'init': {
				flagOptions = {
					shortFlag: 'i',
					type: 'boolean',
				};
				break;
			}

			case 'check': {
				flagOptions = {
					aliases: ['lint', ''],
					shortFlag: 'l',
					type: 'boolean',
				};
				break;
			}

			case 'fix': {
				flagOptions = {
					shortFlag: 'f',
					type: 'boolean',
				};
				break;
			}

			case 'printConfig': {
				flagOptions = {
					shortFlag: 'p',
					type: 'boolean',
				};
				break;
			}

			case 'help': {
				flagOptions = {
					type: 'boolean',
				};
				break;
			}

			case 'version': {
				flagOptions = {
					type: 'boolean',
				};
				break;
			}

			default: {
				console.error(`Unknown command name: ${name}`);
			}
		}

		acc[name] = flagOptions;
		return acc;
	}, {});
}

async function streamToString(stream: Stream): Promise<string> {
	const chunks: Buffer[] = [];
	return new Promise((resolve, reject) => {
		stream.on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
		stream.on('error', (error) => {
			reject(error);
		});
		stream.on('end', () => {
			resolve(Buffer.concat(chunks).toString('utf8'));
		});
	});
}

export async function executeJsonOutput(
	logStream: NodeJS.WritableStream,
	optionCommand: OptionCommand,
	input: string[] = [],
): Promise<number> {
	// Capture the output of execution, and then format is nicely
	const pass = new PassThrough();
	const exitCode = await execute(pass, optionCommand, input);
	pass.end();

	if (exitCode !== 0) {
		logStream.write('Error printing config.\n');
		return exitCode;
	}

	try {
		const configString = await streamToString(pass);

		logStream.write(stringify(JSON.parse(configString)));
		logStream.write('\n');
		return 0;
	} catch (error) {
		logStream.write(`Error: ${error}\n`);
		return 1;
	}
}

export async function execute(
	logStream: NodeJS.WritableStream,
	optionCommand: OptionCommand,
	input: string[] = [],
): Promise<number> {
	if (optionCommand.command !== undefined && typeof optionCommand.command === 'string') {
		let exitCode: number;

		try {
			const subprocess = execa(
				optionCommand.command,
				[...(optionCommand.options ?? []), ...input],
				{
					env: {
						// eslint-disable-next-line @typescript-eslint/naming-convention
						FORCE_COLOR: 'true',
					},
					stdin: 'inherit', // For input, todo anything weird here?
				},
			);

			// End false is key here, otherwise the stream will close before the subprocess is done
			subprocess.stdout?.pipe(logStream, { end: false });
			subprocess.stderr?.pipe(logStream, { end: false });
			await subprocess;
			exitCode = subprocess.exitCode ?? 1;
		} catch (error) {
			// Console.error(`${optionCommand.command} failed with error "${error.shortMessage}"`);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			exitCode = typeof error.exitCode === 'number' ? (error.exitCode as number) : 1;
		}

		return exitCode;
	}

	logStream.write(`Error: Invalid optionCommand: ${JSON.stringify(optionCommand, undefined, 2)}`);
	return 1;
}

function checkArguments(
	input: string[],
	optionCommand: OptionCommand,
	logStream: NodeJS.WritableStream,
): void {
	// Warn if no default arguments are provided, don't be too clever
	if (input.length === 0 && !optionCommand.defaultArguments) {
		logStream.write('Error: This command must be used with a file argument\n');
		process.exit(1);
	}
}

export async function buildCommands(
	command: string,
	logPrefix: string | undefined,
	logColor: ChalkColor,
	options: OptionCommands,
) {
	const cli = meow({
		allowUnknownFlags: false,
		booleanDefault: undefined,
		flags: generateFlags(options),
		help: generateHelpText(command, options),
		importMeta: import.meta,
	});

	const { flags, input } = cli;

	const commandsToRun = Object.keys(options).reduce<OptionCommands>(
		(acc, command: keyof OptionCommands) => {
			if (flags[command]) {
				acc[command] = options[command];
			}

			return acc;
		},
		{},
	);

	// Set up log stream
	const logStream = createStreamTransform(logPrefix, logColor);
	logStream.pipe(process.stdout);

	// Make 'check' the default behavior if no flags are specified
	if (Object.keys(commandsToRun).length === 0) {
		if (options.check === undefined) {
			logStream.write(`This command requires options. Run ${command} --help for valid commands.\n`);
		} else {
			commandsToRun.check = options.check;
		}
	}

	// Debug
	// console.log(`commandsToRun: ${JSON.stringify(commandsToRun, undefined, 2)}`);

	let aggregateExitCode = 0;

	for (const [name, optionCommand] of Object.entries(commandsToRun)) {
		if (typeof optionCommand.command === 'function') {
			checkArguments(input, optionCommand, logStream);

			const args = input.length === 0 ? optionCommand.defaultArguments ?? [] : input;
			const options = optionCommand.options ?? [];

			// Custom function execution is always the same
			aggregateExitCode += await optionCommand.command(logStream, args, options);
		} else if (typeof optionCommand.command === 'string') {
			// Warn if no default arguments are provided, don't be too clever
			checkArguments(input, optionCommand, logStream);

			aggregateExitCode += await execute(
				logStream,
				optionCommand,
				input.length === 0 ? optionCommand.defaultArguments : input,
			);
		} else {
			// Handle default behaviors (e.g. {})
			switch (name) {
				case 'init': {
					// By default, copies files in script package's /init directory to the root of the package it's called from

					// Copy files
					const destinationPackage = await packageUp();
					if (destinationPackage === undefined) {
						logStream.write(
							'Error: The `--init` flag must be used in a directory with a package.json file\n',
						);
						aggregateExitCode += 1;
						break;
					}

					const sourcePackage = await packageUp({ cwd: fileURLToPath(import.meta.url) });
					if (sourcePackage === undefined) {
						logStream.write('Error: The script being called was not in a package, weird.\n');
						aggregateExitCode += 1;
						break;
					}

					const source = path.join(path.dirname(sourcePackage), 'init/');
					const destination = path.dirname(destinationPackage);

					logStream.write(
						`Copying initial configuration files from:\n"${source}" → "${destination}"\n`,
					);

					const copyCommand: OptionCommand = {
						command: 'cp',
						options: ['-Ri', `${source}`, `${destination}`],
					};

					aggregateExitCode += await execute(logStream, copyCommand);
					break;
				}

				case 'check': {
					console.error('No default implementation for check');
					aggregateExitCode += 1;
					break;
				}

				case 'fix': {
					console.error('No default implementation for fix');
					aggregateExitCode += 1;
					break;
				}

				case 'printConfig': {
					const args = input.length === 0 ? optionCommand.defaultArguments ?? ['.'] : input;
					const filePath = args?.at(0);

					// Brittle, could pass config name to commandBuilder() instead
					const configName = command.split('-').at(0);

					if (configName === undefined) {
						logStream.write(`Error: Could not find or parse config file for ${command}.\n`);
						aggregateExitCode += 1;
						break;
					}

					const configSearch = await cosmiconfig(configName).search(filePath);

					if (!configSearch?.config) {
						logStream.write(`Error: Could not find or parse config file for ${configName}.\n`);
						aggregateExitCode += 1;
						break;
					}

					logStream.write(`${logPrefix} config path: "${configSearch?.filepath}"\n`);
					logStream.write(stringify(configSearch.config));
					logStream.write('\n');
					break;
				}

				default: {
					console.error(`Unknown command name: ${name}`);
					aggregateExitCode += 1;
					break;
				}
			}
		}
	}

	process.exit(aggregateExitCode > 0 ? 1 : 0);
}
