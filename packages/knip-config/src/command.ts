import path from 'node:path'
import { type CommandDefinition, getCosmiconfigCommand } from '../../../src/command-builder.js'
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
			description:
				'Automatically fix certain linting issues. This package-scoped command searches from the nearest package root directory.',
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
					optionFlags: ['--no-progress', '--no-config-hints', ...getWorkspaceOptionFlags()],
				},
				// "Production" pass is not worth it?
				// {
				// 	command: 'knip',
				// 	logColor: 'cyanBright',
				// 	logPrefix: '[Production]',
				// 	optionFlags: ['--no-progress', '--no-config-hints', '--production'],
				// },
			],
			description:
				'Check for unused code and dependencies. This package-scoped command searches from the nearest package root directory. In a monorepo, it will also check all packages below the current working directory.',
			positionalArgumentMode: 'none',
		},
		printConfig: {
			commands: [getCosmiconfigCommand('knip')],
			description: 'Print the Knip configuration.',
			positionalArgumentMode: 'none',
		},
	},
	description: 'Clean up unused clutter in your project with Knip.',
	logColor: 'cyan',
	logPrefix: '[Knip]',
	name: 'knip-config',
}
