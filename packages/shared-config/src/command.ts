#!/usr/bin/env node

import {
	type CommandCli,
	type CommandDefinition,
	type Commands,
	DESCRIPTION,
} from '../../../src/command-builder.js'
import { kebabCase } from '../../../src/string-utils.js'
import { commandDefinition as cspellCommand } from '../../cspell-config/src/command.js'
import { commandDefinition as eslintCommand } from '../../eslint-config/src/command.js'
import { commandDefinition as knipCommand } from '../../knip-config/src/command.js'
import { commandDefinition as mdatCommand } from '../../mdat-config/src/command.js'
import { commandDefinition as prettierCommand } from '../../prettier-config/src/command.js'
import { commandDefinition as remarkCommand } from '../../remark-config/src/command.js'
import { commandDefinition as repoCommand } from '../../repo-config/src/command.js'
import { commandDefinition as stylelintCommand } from '../../stylelint-config/src/command.js'
import { commandDefinition as typescriptCommand } from '../../typescript-config/src/command.js'

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
	// Sort definition by order field in place
	definitions.sort((a, b) => a.order - b.order)

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
				subcommands: [kebabCase(key)],
			})
		}
	}

	return commands
}

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: getCommands('fix', subcommandDefinitions),
			description: `Fix your project with multiple tools in one go. ${DESCRIPTION.multiArgumentCaveat}`,
			positionalArgumentMode: 'optional',
		},
		init: {
			commands: getCommands('init', subcommandDefinitions),
			description: `Initialize configuration files for the entire suite of @kitschpatrol/shared-config tools. ${DESCRIPTION.multiOptionCaveat}`,
			locationOptionFlag: true,
			// TODO does this try to copy files from shared config?
		},
		lint: {
			commands: getCommands('lint', subcommandDefinitions),
			description: `Lint your project with multiple tools in one go. ${DESCRIPTION.multiArgumentCaveat}`,
			positionalArgumentMode: 'optional',
		},
		printConfig: {
			commands: getCommands('printConfig', subcommandDefinitions),
			description: `Print aggregated tool configuration data. ${DESCRIPTION.multiArgumentCaveat}`,
			positionalArgumentMode: 'optional',
		},
	},
	description: 'Run aggregated @kitschpatrol/shared-config commands.',
	logColor: 'yellow',
	logPrefix: '🔬',
	name: 'kpsc',
	order: 0,
	showSummary: true,
	verbose: true,
}
