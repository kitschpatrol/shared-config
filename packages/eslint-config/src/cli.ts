#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js';

await buildCommands('eslint-config', 'ESLint', 'magenta', {
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
