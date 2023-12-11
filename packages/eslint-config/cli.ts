#!/usr/bin/env node
import { buildCommands } from '../../utils/command-builder.js';

await buildCommands('eslint-config', {
	check: {
		command: 'eslint',
		defaultArguments: ['.'],
	},
	fix: {
		command: 'eslint',
		defaultArguments: ['.'],
		options: ['--fix'],
	},
	init: {},
	printConfig: {
		command: 'eslint',
		options: ['--print-config'],
	},
});
