import type { CommandCli, CommandDefinition, Commands } from '../../../src/command-builder.js'
import { DESCRIPTION } from '../../../src/command-builder.js'
import { kebabCase } from '../../../src/string-utilities.js'
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

	// Tools without a fix command (e.g. type checking) run their lint during
	// fix instead, after all the fixers so they see the fixed state. This way
	// fix surfaces every issue a subsequent lint would report.
	const entries: Array<{ definition: CommandDefinition; effectiveKey: keyof Commands }> = []
	for (const definition of definitions) {
		if (definition.commands[key] !== undefined) {
			entries.push({ definition, effectiveKey: key })
		}
	}

	if (key === 'fix') {
		for (const definition of definitions) {
			if (definition.commands.fix === undefined && definition.commands.lint !== undefined) {
				entries.push({ definition, effectiveKey: 'lint' })
			}
		}
	}

	const commands: CommandCli[] = []
	for (const { definition, effectiveKey } of entries) {
		commands.push({
			name: definition.name,
			...(effectiveKey === 'init'
				? {
						// Special case for init location flag
						receiveOptionFlags: definition.commands.init?.locationOptionFlag ?? false,
					}
				: {
						// Other commands can take positional arguments
						receivePositionalArguments:
							definition.commands[effectiveKey]?.positionalArgumentMode !== 'none',
					}),
			// The spawned ksc-* CLIs honor KSC_FORMAT themselves: they render
			// machine output directly and emit their own JSON reports for merging
			...((key === 'lint' || key === 'fix') && { outputFormatAware: true }),
			subcommands: [kebabCase(effectiveKey)],
		})
	}

	return commands
}

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: getCommands('fix', subcommandDefinitions),
			description: `Fix your project with multiple tools in one go. Tools without auto-fixes run their checks afterward, so remaining issues match a subsequent lint. ${DESCRIPTION.multiArgumentCaveat}`,
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
	name: 'ksc',
	order: 0,
	showSummary: true,
	verbose: true,
}
