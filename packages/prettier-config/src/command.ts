import type { CommandDefinition } from '../../../src/command-builder.js'
import { DESCRIPTION, getCosmiconfigCommand } from '../../../src/command-builder.js'
import { getFilePathAtProjectRoot } from '../../../src/path-utilities.js'

// Plugins are also listed in the shared prettier config, so passing them via
// CLI is redundant when prettier finds the config. We pass them anyway as
// defense in depth:
//   - CLI plugin resolution starts from prettier's own install location, which
//     reliably sees hoisted deps (incl. transitive deps of this package) across
//     pnpm/yarn/npm topologies. Config-based resolution starts from the config
//     file's directory and can miss deps in stricter setups.
//   - When invoked on a path outside any project (orphan files, ad-hoc CI runs)
//     prettier finds no config and loads no plugins. CLI flags ensure non-builtin
//     parsers (svelte, astro, sh, …) still work.
// Ignore paths must be resolved at the project root for prettier to honor them
// when invoked from a subdirectory.
const sharedOptions = [
	'--log-level=warn',
	'--plugin=@kitschpatrol/prettier-plugin-astro',
	'--plugin=@prettier/plugin-php',
	'--plugin=@prettier/plugin-ruby',
	'--plugin=@prettier/plugin-xml',
	'--plugin=prettier-plugin-jsdoc',
	'--plugin=prettier-plugin-packagejson',
	'--plugin=prettier-plugin-sh',
	'--plugin=prettier-plugin-svelte',
	// TODO Disabled in favor of jsdoc pending https://github.com/hosseinmd/prettier-plugin-jsdoc/pull/255
	// '--plugin=prettier-plugin-tailwindcss',
	'--plugin=prettier-plugin-toml',
	// Disabled because it is huge
	// '--plugin=prettier-plugin-sql',
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
