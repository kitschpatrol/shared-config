/* eslint-disable unicorn/no-process-exit */
// Creates cli bin files for each package
// based on the shared-config field in their package.js

import { execa } from 'execa';
import meow from 'meow';
import type { Flag } from 'meow';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { packageUp } from 'package-up';

// TODO get these from meow?
type StringFlag = Flag<'string', string> | Flag<'string', string[], true>;
type BooleanFlag = Flag<'boolean', boolean> | Flag<'boolean', boolean[], true>;
type NumberFlag = Flag<'number', number> | Flag<'number', number[], true>;
type AnyFlag = BooleanFlag | NumberFlag | StringFlag;
type AnyFlags = Record<string, AnyFlag>;

type OptionCommand = {
	/** Either a string to run a command, or a function to do something custom. If undefined, a default behavior is used. */
	command?: ((args: string[], options: string[]) => Promise<number>) | string;
	/** Arguments to be passed to the command in the absence of user-provided arguments */
	defaultArguments?: string[];
	/** Options to be passed to the command. The argument is handled in command-builder.ts */
	options?: string[];
};

export type OptionCommands = {
	[key in 'check' | 'fix' | 'init' | 'printConfig']?: OptionCommand;
};

function generateHelpText(command: string, options: OptionCommands): string {
	let helpText = `
  Usage
    $ ${command} [<file|glob> ...]
  `;

	if (Object.keys(options).length > 0) {
		helpText += '\n  Options';

		for (const name of Object.keys(options)) {
			switch (name) {
				case 'init': {
					helpText += '\n    --init, -i            Initialize by copying starter config files to your project root.';
					break;
				}

				case 'check': {
					helpText += `\n    --check, -c           Check for and report issues. Same as ${command}.`;
					break;
				}

				case 'fix': {
					helpText += '\n    --fix, -f             Fix all auto-fixable issues, and report the un-fixable.';
					break;
				}

				case 'printConfig': {
					helpText += '\n    --print-config <file> Print the effective configuration for a file';
					break;
				}

				default: {
					console.error(`Unknown command name: ${name}`);
				}
			}
		}
	}

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

export async function execute(optionCommand: OptionCommand, input: string[] = []): Promise<number> {
	if (optionCommand.command !== undefined && typeof optionCommand.command === 'string') {
		let exitCode: number;
		try {
			const subprocess = execa(optionCommand.command, [...(optionCommand.options ?? []), ...input], {
				env: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					FORCE_COLOR: 'true',
				},
				stderr: 'inherit',
				stdin: 'inherit', // For input, todo anything weird here?
				// All: true,
				stdout: 'inherit',
			});

			// Using stdout: 'inherit' for now instead...
			// subprocess.all?.pipe(process.stdout);
			await subprocess;
			exitCode = subprocess.exitCode ?? 1;
		} catch (error) {
			// Console.error(`${optionCommand.command} failed with error "${error.shortMessage}"`);
			exitCode = typeof error.exitCode === 'number' ? (error.exitCode as number) : 1;
		}

		return exitCode;
	}

	console.error(`Invalid optionCommand: ${JSON.stringify(optionCommand, undefined, 2)}`);
	return 1;
}

function checkArguments(input: string[], optionCommand: OptionCommand): void {
	// Warn if no default arguments are provided, don't be too clever
	if (input.length === 0 && !optionCommand.defaultArguments) {
		console.error('This command must be used with a file argument');
		process.exit(1);
	}
}

export async function buildCommands(command: string, options: OptionCommands) {
	const cli = meow(generateHelpText(command, options), {
		allowUnknownFlags: false,
		booleanDefault: undefined,
		flags: generateFlags(options),
		importMeta: import.meta,
	});

	const { flags, input } = cli;

	const commandsToRun = Object.keys(options).reduce<OptionCommands>((acc, command: keyof OptionCommands) => {
		if (flags[command]) {
			acc[command] = options[command];
		}

		return acc;
	}, {});

	// Make 'check' the default behavior if no flags are specified
	if (Object.keys(commandsToRun).length === 0) {
		commandsToRun.check = options.check;
	}

	// Debug
	// console.log(`commandsToRun: ${JSON.stringify(commandsToRun, undefined, 2)}`);

	let aggregateExitCode = 0;

	for (const [name, optionCommand] of Object.entries(commandsToRun)) {
		if (typeof optionCommand.command === 'function') {
			checkArguments(input, optionCommand);

			const args = input.length === 0 ? optionCommand.defaultArguments ?? [] : input;
			const options = optionCommand.options ?? [];

			// Custom function execution is always the same
			aggregateExitCode += await optionCommand.command(args, options);
		} else if (typeof optionCommand.command === 'string') {
			// Warn if no default arguments are provided, don't be too clever
			checkArguments(input, optionCommand);

			aggregateExitCode += await execute(optionCommand, input.length === 0 ? optionCommand.defaultArguments : input);
		} else {
			// Handle default behaviors (e.g. {})
			switch (name) {
				case 'init': {
					// By default, copies files in script package's /init directory to the root of the package it's called from

					// Copy files
					const destinationPackage = await packageUp();
					if (destinationPackage === undefined) {
						console.error('The `--init` flag must be used in a directory with a package.json file');
						aggregateExitCode += 1;
						break;
					}

					const sourcePackage = await packageUp({ cwd: fileURLToPath(import.meta.url) });
					if (sourcePackage === undefined) {
						console.error('The script being called was not in a package, weird.');
						aggregateExitCode += 1;
						break;
					}

					const source = path.join(path.dirname(sourcePackage), 'init/');
					const destination = path.dirname(destinationPackage);

					console.log(`Copying initial configuration files from:\n"${source}" → "${destination}"`);

					const copyCommand: OptionCommand = {
						command: 'cp',
						options: ['-Ri', `${source}`, `${destination}`],
					};

					aggregateExitCode += await execute(copyCommand);
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
					console.error('No default implementation for print-config');
					aggregateExitCode += 1;
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
