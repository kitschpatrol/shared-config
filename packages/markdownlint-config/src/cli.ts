#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js';

// TODO how best to append {md,mdx} condition to arguments
// from shared-config script?

await buildCommands('markdownlint-config', 'markdownlint', 'green', {
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
