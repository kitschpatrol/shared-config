import {
	type CommandDefinition,
	DESCRIPTIONS,
	getCosmiconfigCommand,
} from '../../../src/command-builder.js'
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
			description: `Format files according to your Prettier configuration. ${DESCRIPTIONS.fileRun}`,
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
			description: `Check that files are formatted according to your Prettier configuration. ${DESCRIPTIONS.fileRun}`,
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		printConfig: {
			// See also --find-config-path and --file-info options for fancier per-file approaches...
			commands: [getCosmiconfigCommand('prettier')],
			description: `Print the effective Prettier configuration. ${DESCRIPTIONS.packageSearch}. ${DESCRIPTIONS.monorepoSearch}.`,
			positionalArgumentMode: 'none',
		},
	},
	description: "Kitschpatrol's Prettier shared configuration tools.",
	logColor: 'blue',
	logPrefix: '[Prettier]',
	name: 'kpsc-prettier',
}
