#!/usr/bin/env node
import { buildCommands, executeJsonOutput } from '../../../src/command-builder.js'

const sharedOptions = ['--ignore-path', '.gitignore', '--allow-empty-input']
const sharedDefaultArguments = ['**/*.{css,scss,sass,svelte,html,astro}']

await buildCommands('stylelint-config', '[Stylelint]', 'greenBright', {
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
		async command(logStream, args) {
			return executeJsonOutput(
				logStream,
				{
					command: 'stylelint',
					options: ['--print-config'],
				},
				args,
			)
		},
		defaultArguments: ['.'],
	},
})
