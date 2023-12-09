import { buildCommands } from '../../utils/command-builder.js';

await buildCommands('eslint-config', {
	check: {
		command: 'eslint',
	},
	fix: {
		command: 'eslint',
		options: ['--fix'],
	},
	init: {},
	printConfig: {
		command: 'eslint',
		options: ['--print-config'],
	},
});
