import { loadConfig, loadConfigReadme } from 'mdat'
import {
	type CommandCli,
	type CommandDefinition,
	getCosmiconfigResult,
} from '../../../src/command-builder.js'
import { stringify } from '../../../src/json-utils.js'
import { findWorkspacePackageDirectories } from '../../../src/path-utils.js'

async function getMdatConfigFilepath(): Promise<string | undefined> {
	const result = await getCosmiconfigResult('mdat')
	return result?.filepath
}

/**
 * Handles monorepos intelligently...
 */
async function generateMdatReadmeCommands(action: 'check' | 'expand'): Promise<CommandCli[]> {
	const packageDirectories = findWorkspacePackageDirectories()
	const configPath = await getMdatConfigFilepath()

	const commands: CommandCli[] = []
	for (const directory of packageDirectories) {
		commands.push({
			cwdOverride: directory,
			name: 'mdat',
			optionFlags: configPath ? ['--config', configPath] : [], // Don't love this
			subcommands: ['readme', action],
		})
	}

	return commands
}

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: await generateMdatReadmeCommands('expand'),
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
			commands: await generateMdatReadmeCommands('check'),
			description:
				'Validate that all mdat content placeholders in your readme.md file(s) have been expanded. This package-scoped command searches for the readme.md adjacent the nearest package.json. In a monorepo, it will also find readmes in any packages below the current working directory.',
			positionalArgumentMode: 'none',
		},
		printConfig: {
			commands: [
				{
					async execute(logStream) {
						const configName = 'mdat'

						// Use cosmiconfig directly to find file path
						const result = await getCosmiconfigResult(configName)
						if (result !== undefined) {
							logStream.write(`Found ${configName} readme configuration at "${result.filepath}"\n`)
						}

						// Then load it through mdat to get the actual resolved object with readme-related defaults
						const additionalConfig = await loadConfig()

						const config = await loadConfigReadme({
							additionalConfig,
						})
						const prettyAndColorfulJsonLines = stringify(config).split('\n')
						for (const line of prettyAndColorfulJsonLines) {
							logStream.write(`${line}\n`)
						}

						return 0
					},
					name: 'print mdat config',
				},
			],
			description: 'Print the Mdat configuration.',
			positionalArgumentMode: 'none',
		},
	},
	description: 'Expand content placeholders in your readme.md and other Markdown files.',
	logColor: 'green',
	logPrefix: '[Mdat Config]',
	name: 'kpsc-mdat',
}
