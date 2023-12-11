#!/usr/bin/env node
import { buildCommands } from '../../utils/command-builder.js';
import { resolveConfig } from 'prettier';

// TODO bad idea?
// At least test the ruby situation
const sharedOptions = [
	'--log-level=warn',
	'--plugin=@prettier/plugin-php',
	'--plugin=@prettier/plugin-ruby',
	'--plugin=@prettier/plugin-xml',
	'--plugin=prettier-plugin-astro',
	'--plugin=prettier-plugin-pkg',
	'--plugin=prettier-plugin-sh',
	'--plugin=prettier-plugin-sql',
	'--plugin=prettier-plugin-svelte',
	'--plugin=prettier-plugin-tailwindcss',
	'--plugin=prettier-plugin-toml',
];

await buildCommands('prettier-config', {
	check: {
		command: 'prettier',
		defaultArguments: ['.'],
		options: [...sharedOptions, '--check'],
	},
	fix: {
		command: 'prettier',
		defaultArguments: ['.'],
		options: [...sharedOptions, '--write'],
	},
	init: {},
	printConfig: {
		async command(args) {
			const filePath = args?.at(0);

			if (filePath) {
				console.log(JSON.stringify(await resolveConfig(filePath, {}), undefined, 2));
				return 0;
			}

			return 1;
		},
	},
});
