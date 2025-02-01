#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js'

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
]

await buildCommands('prettier-config', '[Prettier]', 'blue', {
	fix: {
		command: 'prettier',
		defaultArguments: ['.'],
		options: [...sharedOptions, '--write'],
	},
	init: {
		command: {
			configFile: 'prettier.config.js',
			configPackageJson: {
				prettier: '@kitschpatrol/prettier-config',
			},
		},
	},
	lint: {
		command: 'prettier',
		defaultArguments: ['.'],
		options: [...sharedOptions, '--check'],
	},
	printConfig: {}, // Use default implementation,
})
