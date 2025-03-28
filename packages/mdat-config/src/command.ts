import { loadConfig, loadConfigReadme } from 'mdat'
import type { CommandCli, CommandDefinition } from '../../../src/command-builder.js'
import { DESCRIPTION, getCosmiconfigResult } from '../../../src/command-builder.js'
import { stringify } from '../../../src/json-utilities.js'
import { findWorkspacePackageDirectories } from '../../../src/path-utilities.js'

async function getMdatConfigFilepath(): Promise<string | undefined> {
	const result = await getCosmiconfigResult('mdat')
	return result?.filepath
}

async function printMdatConfigCommand(logStream: NodeJS.WritableStream): Promise<number> {
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
}

/**
 * Handles monorepos intelligently...
 * But kind of gross that it executes dynamically
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
			description: `Expand all Mdat content placeholders in your readme.md file(s). ${DESCRIPTION.packageRun} ${DESCRIPTION.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
		init: {
			configFile: 'mdat.config.ts',
			configPackageJson: {
				// Gnarly but it works...
				// https://github.com/cosmiconfig/cosmiconfig#imports
				// A plain `@kitschpatrol/mdat-config` unfortunately does not resolve the export
				mdat: {
					$import: 'node_modules/@kitschpatrol/mdat-config/dist/index.js',
				},
			},
			locationOptionFlag: true,
		},
		lint: {
			commands: await generateMdatReadmeCommands('check'),
			description: `Validate that all Mdat content placeholders in your readme.md file(s) have been expanded. ${DESCRIPTION.packageRun} ${DESCRIPTION.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
		printConfig: {
			commands: [
				{
					execute: printMdatConfigCommand,
					name: printMdatConfigCommand.name,
				},
			],
			description: `Print the effective Mdat configuration. ${DESCRIPTION.packageSearch}. ${DESCRIPTION.monorepoSearch}. Includes configuration provided by the \`mdat readme\` command.`,
			positionalArgumentMode: 'none',
		},
	},
	description: "Kitschpatrol's Mdat shared configuration tools.",
	logColor: 'green',
	logPrefix: '[Mdat Config]',
	name: 'kpi-mdat',
	order: 2,
}
