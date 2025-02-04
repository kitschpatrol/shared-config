import { type CommandCli, type CommandDefinition } from '../../../src/command-builder-new.js'
import { findWorkspacePackageDirectories } from '../../../src/path-utils.js'

/**
 * Handles monorepos intelligently...
 */
function generateMdatReadmeCommands(action: 'check' | 'expand'): CommandCli[] {
	const packageDirectories = findWorkspacePackageDirectories()

	const commands: CommandCli[] = []
	for (const directory of packageDirectories) {
		commands.push({
			command: 'mdat',
			cwdOverride: directory,
			optionFlags: ['readme', action],
		})
	}

	return commands
}

export const commandDefinition: CommandDefinition = {
	command: 'mdat-config',
	description: 'Expand content placeholders in your readme.md and other Markdown files.',
	logColor: 'green',
	logPrefix: '[Mdat Config]',
	subcommands: {
		fix: {
			commands: generateMdatReadmeCommands('expand'),
			description:
				'Expand all mdat content placeholders in your readme.md file(s). This package-scoped command searches for the readme.md adjacent the nearest package.json. In a monorepo, it will also find readmes in any packages below the current working directory.',
			positionalArgumentMode: 'none',
		},
		init: {
			configFile: 'mdat.config.ts',
			configPackageJson: {
				mdat: '@kitschpatrol/mdat-config',
			},
			locationOptionFlag: true,
		},
		lint: {
			commands: generateMdatReadmeCommands('check'),
			description:
				'Validate that all mdat content placeholders in your readme.md file(s) have been expanded. This package-scoped command searches for the readme.md adjacent the nearest package.json. In a monorepo, it will also find readmes in any packages below the current working directory.',
			positionalArgumentMode: 'none',
		},
		// printConfig: {}, // Use default implementation,
	},
}
