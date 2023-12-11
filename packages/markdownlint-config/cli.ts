#!/usr/bin/env node
import { buildCommands } from '../../utils/command-builder.js';

await buildCommands('markdownlint-config', {
	check: {
		command: 'markdownlint',
		defaultArguments: ['**/*.{md,mdx}'],
		options: ['--ignore-path', '.gitignore'],
	},
	fix: {
		command: 'markdownlint',
		defaultArguments: ['**/*.{md,mdx}'],
		options: ['--ignore-path', '.gitignore', '--fix'],
	},
	init: {},
});
