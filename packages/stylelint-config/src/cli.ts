#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js';

const sharedOptions = ['--ignore-path', '.gitignore', '--allow-empty-input'];
const sharedDefaultArguments = ['**/*.{css,scss,sass,svelte,html,astro}'];

await buildCommands('stylelint-config', {
	check: {
		command: 'stylelint',
		defaultArguments: sharedDefaultArguments,
		options: sharedOptions,
	},
	fix: {
		command: 'stylelint',
		defaultArguments: sharedDefaultArguments,
		options: [...sharedOptions, '--fix'],
	},
	init: {},
	printConfig: {
		command: 'stylelint',
		options: ['--print-config'],
	},
});
