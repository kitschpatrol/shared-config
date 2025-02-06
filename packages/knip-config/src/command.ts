import path from 'node:path'
import {
	type CommandDefinition,
	DESCRIPTIONS,
	getCosmiconfigCommand,
} from '../../../src/command-builder.js'
import { getPackageDirectory, getWorkspaceRoot, isMonorepo } from '../../../src/path-utils.js'
import sharedKnipConfig from './index.js'

function getWorkspaceOptionFlags(): string[] {
	if (isMonorepo()) {
		// Are we in a subpackage of the monorepo?
		const packageDirectory = getPackageDirectory()
		const workspaceRoot = getWorkspaceRoot()
		if (packageDirectory !== workspaceRoot) {
			// Yes, we are in a subpackage
			const packagePath = path.relative(workspaceRoot, packageDirectory)
			return ['--workspace', packagePath]
		}
	}

	return []
}

function getKnipPackageJsonObject(): Record<string, unknown> {
	// Possibly brittle if dynamic stuff happens in the future
	return {
		// Doesn't work
		// knip: '@kitschpatrol/knip-config',
		knip: sharedKnipConfig,
	}
}

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					cwdOverride: 'workspace-root',
					name: 'knip',
					optionFlags: ['--fix', '--allow-remove-files', ...getWorkspaceOptionFlags()],
				},
			],
			description: `Automatically remove unused code and dependencies. ${DESCRIPTIONS.packageRun} ${DESCRIPTIONS.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
		init: {
			configFile: 'knip.config.ts',
			configPackageJson: getKnipPackageJsonObject(),
			locationOptionFlag: true, // Knip doesn't support references to config files in package.json?
		},
		lint: {
			commands: [
				{
					// Run from root, then pass --workspace IF in a monorepo and called from a subpackage
					cwdOverride: 'workspace-root',
					name: 'knip',
					optionFlags: ['--no-progress', ...getWorkspaceOptionFlags()],
				},
				// "Production" pass is not worth it?
				// {
				// 	command: 'knip',
				// 	logColor: 'cyanBright',
				// 	logPrefix: '[Production]',
				// 	optionFlags: ['--no-progress', '--production'],
				// },
			],
			description: `Check for unused code and dependencies. ${DESCRIPTIONS.packageRun} ${DESCRIPTIONS.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
		printConfig: {
			commands: [getCosmiconfigCommand('knip')],
			description: `Print the effective Knip configuration. ${DESCRIPTIONS.packageSearch} ${DESCRIPTIONS.monorepoSearch}`,
			positionalArgumentMode: 'none',
		},
	},
	description: "Kitschpatrol's Knip shared configuration tools.",
	logColor: 'cyan',
	logPrefix: '[Knip]',
	name: 'kpsc-knip',
	order: 7,
}
