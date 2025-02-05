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
import {
	type CommandCli,
	type CommandDefinition,
	type Commands,
} from '../../../src/command-builder.js'

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

function getCommands(key: keyof Commands, definitions: CommandDefinition[]): CommandCli[] {
	const commands: CommandCli[] = []
	for (const definition of definitions) {
		const keys = Object.keys(definition.commands)
		if (keys.includes(key)) {
			commands.push({
				name: definition.name,
				...(key === 'init'
					? {
							// Special case for init location flag
							receiveOptionFlags: definition.commands[key]?.locationOptionFlag,
						}
					: {
							// Other commands can take positional arguments
							receivePositionalArguments:
								definition.commands[key]?.positionalArgumentMode !== 'none',
						}),
				subcommands: [key],
			})
		}
	}

	return commands
}

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: getCommands('fix', subcommandDefinitions),
			description: 'Fix the project',
			positionalArgumentMode: 'optional',
		},
		init: {
			commands: getCommands('init', subcommandDefinitions),
			locationOptionFlag: true,
			// TODO does this try to copy files from shared config?
		},
		lint: {
			commands: getCommands('lint', subcommandDefinitions),
			description: 'Lint the project',
			positionalArgumentMode: 'optional',
		},
	},
	description: 'Run shared config commands',
	logColor: 'yellow',
	logPrefix: '🔬',
	name: 'shared-config',
	showSummary: true,
	verbose: true,
}
