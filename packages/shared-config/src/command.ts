#!/usr/bin/env node

import { commandDefinition as cspellCommand } from '../../cspell-config/src/command.js'
import { commandDefinition as eslintCommand } from '../../eslint-config/src/command.js'
import { commandDefinition as knipCommand } from '../../knip-config/src/command.js'
import { commandDefinition as mdatCommand } from '../../mdat-config/src/command.js'
import { commandDefinition as prettierCommand } from '../../prettier-config/src/command.js'
import { commandDefinition as remarkCommand } from '../../remark-config/src/command.js'
import { commandDefinition as repoCommand } from '../../repo-config/src/command.js'
import { commandDefinition as stylelintCommand } from '../../stylelint-config/src/command.js'
import { commandDefinition as typescriptCommand } from '../../typescript-config/src/command.js'



// import chalk from 'chalk'
import { type CommandCli, type CommandDefinition } from '../../../src/command-builder-new.js'
// import { kebabCase, pluralize } from '../../../src/string-utils.js'
// import { capabilities } from '../build/capabilities.js'

// async function executeCommands(
// 	logStream: NodeJS.WritableStream,
// 	commands: string[],
// 	options: string[],
// 	args: string[],
// ): Promise<number> {
// 	const successfulCommands: string[] = []
// 	const failedCommands: string[] = []

// 	for (const command of commands) {
// 		logStream.write(`Running "${[command, ...args, ...options].join(' ')}"\n`)

// 		const exitCode = await execute(
// 			logStream,
// 			{
// 				command,
// 				options,
// 			},
// 			args,
// 		)

// 		if (exitCode === 0) {
// 			successfulCommands.push(command)
// 		} else {
// 			failedCommands.push(command)
// 		}
// 	}

// 	if (successfulCommands.length > 0) {
// 		logStream.write(
// 			`✅ ${chalk.green.bold(
// 				`${successfulCommands.length} Successful ${pluralize(
// 					'command',
// 					successfulCommands.length,
// 				)}:`,
// 			)} ${successfulCommands.join(', ')}\n`,
// 		)
// 	}

// 	if (failedCommands.length > 0) {
// 		logStream.write(
// 			`❌ ${chalk.green.bold(
// 				`${failedCommands.length} Failed ${pluralize('command', failedCommands.length)}:`,
// 			)} ${failedCommands.join(', ')}\n`,
// 		)
// 	}

// 	return failedCommands.length > 0 ? 1 : 0
// }

const subcommandDefinitions = [
	eslintCommand,
	cspellCommand,
	knipCommand,
	mdatCommand,
	prettierCommand,
	remarkCommand,
	repoCommand,
	stylelintCommand,
	typescriptCommand,
]

// for (const capability of Object.keys(capabilities)) {
// 	subcommands[capability as keyof Subcommands] = {
// 		async command(logStream, args) {
// 			return executeCommands(
// 				logStream,
// 				capabilities[capability as keyof typeof capabilities],
// 				[kebabCase(capability)],
// 				args,
// 			)
// 		},
// 		defaultArguments: [],
// 	}
// }

function getLintCommands(definitions: CommandDefinition[]): CommandCli[] {
	const commands: CommandCli[] = []
	for (const definition of definitions) {
		const keys = Object.keys(definition.subcommands)
		if (keys.includes('lint')) {
			commands.push({
				command: definition.command,
				receivePositionalArguments: definition.subcommands.lint?.positionalArgumentMode !== 'none',
				subcommands: ['lint'],
			})
		}
	}

	return commands
}


console.log(getLintCommands(subcommandDefinitions));

// TODO make summary a flag on this?

export const commandDefinition: CommandDefinition = {
	command: 'shared-config',
	description: 'Run shared config commands',
	logColor: 'yellow',
	logPrefix: '🔬',
	subcommands: {
		lint: {
			commands: getLintCommands(subcommandDefinitions),
			description: 'Lint the project',
			positionalArgumentMode: 'optional',
		},
	},
}
