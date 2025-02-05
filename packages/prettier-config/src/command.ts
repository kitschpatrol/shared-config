import { type CommandDefinition, getCosmiconfigCommand } from '../../../src/command-builder.js'
import { getFilePathAtProjectRoot } from '../../../src/path-utils.js'

// TODO bad idea?
// At least test the ruby situation
const sharedOptions = [
	'--log-level=warn',
	'--plugin=@prettier/plugin-php',
	'--plugin=@prettier/plugin-ruby',
	'--plugin=@prettier/plugin-xml',
	'--plugin=prettier-plugin-astro',
	'--plugin=prettier-plugin-packagejson',
	'--plugin=prettier-plugin-sh',
	'--plugin=prettier-plugin-sql',
	'--plugin=prettier-plugin-svelte',
	'--plugin=prettier-plugin-tailwindcss',
	'--plugin=prettier-plugin-toml',
	// Have to resolve to the project root for ignore to work when calling prettier in subdirectories
	`--ignore-path=${getFilePathAtProjectRoot('.gitignore') ?? '.gitignore'}`,
	`--ignore-path=${getFilePathAtProjectRoot('.prettierignore') ?? '.prettierignore'}`,
]

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					name: 'prettier',
					optionFlags: [...sharedOptions, '--write'],
					receivePositionalArguments: true,
				},
			],
			description:
				'Format files according to your Prettier configuration. This file-scoped command searches from the current working directory by default.',
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		init: {
			configFile: 'prettier.config.js',
			configPackageJson: {
				prettier: '@kitschpatrol/prettier-config',
			},
			locationOptionFlag: true,
		},
		lint: {
			commands: [
				{
					name: 'prettier',
					optionFlags: [...sharedOptions, '--check'],
					receivePositionalArguments: true,
				},
			],
			description:
				'Check that your files are formatted according to your Prettier configuration. This file-scoped command searches from the current working directory by default.',
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		printConfig: {
			// See also --find-config-path and --file-info options for fancier per-file approaches...
			commands: [getCosmiconfigCommand('prettier')],
			description: 'Print the prettier configuration.',
			positionalArgumentMode: 'none',
		},
	},
	description: 'TK',
	logColor: 'blue',
	logPrefix: '[Prettier]',
	name: 'prettier-config',
}
