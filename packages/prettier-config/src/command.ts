import type { CommandDefinition } from '../../../src/command-builder.js'
import { DESCRIPTION, getCosmiconfigCommand } from '../../../src/command-builder.js'
import { getFilePathAtProjectRoot } from '../../../src/path-utilities.js'

// TODO bad idea?
// At least test the ruby situation
const sharedOptions = [
	'--log-level=warn',
	'--plugin=@prettier/plugin-php',
	'--plugin=@prettier/plugin-ruby',
	'--plugin=@prettier/plugin-xml',
	'--plugin=@kitschpatrol/prettier-plugin-astro',
	'--plugin=prettier-plugin-packagejson',
	'--plugin=prettier-plugin-sh',
	// Disabled because it is huge
	// '--plugin=prettier-plugin-sql',
	'--plugin=prettier-plugin-svelte',
	// TODO Disabled in favor of jsdoc pending https://github.com/hosseinmd/prettier-plugin-jsdoc/pull/255
	// '--plugin=prettier-plugin-tailwindcss',
	'--plugin=prettier-plugin-toml',
	// Note: prettier-plugin-jsdoc is loaded via the config's plugins array, not here,
	// because its options (e.g. jsdocCommentLineStrategy) must be registered before
	// config validation. See outputFilter below for the residual warning workaround.
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
					// Works around
					// `Ignored unknown option { jsdocCommentLineStrategy: "keep" }`
					// warnings from prettier-plugin-jsdoc
					outputFilter: (line) => line.includes('Ignored unknown option { jsdoc'),
					receivePositionalArguments: true,
				},
			],
			description: `Format files according to your Prettier configuration. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		init: {
			configFile: 'prettier.config.ts',
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
					// Works around
					// `Ignored unknown option { jsdocCommentLineStrategy: "keep" }`
					// warnings from prettier-plugin-jsdoc
					outputFilter: (line) => line.includes('Ignored unknown option { jsdoc'),
					receivePositionalArguments: true,
				},
			],
			description: `Check that files are formatted according to your Prettier configuration. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		printConfig: {
			// See also --find-config-path and --file-info options for fancier per-file approaches...
			commands: [getCosmiconfigCommand('prettier')],
			description: `Print the effective Prettier configuration. ${DESCRIPTION.packageSearch}. ${DESCRIPTION.monorepoSearch}.`,
			positionalArgumentMode: 'none',
		},
	},
	description: "Kitschpatrol's Prettier shared configuration tools.",
	logColor: 'blue',
	logPrefix: '[Prettier]',
	name: 'ksc-prettier',
	order: 9,
}
