#!/usr/bin/env node
import { buildCommands, executeJsonOutput } from '../../../src/command-builder.js'

const sharedOptions = ['--ignore-path', '.gitignore', '--allow-empty-input']
const sharedDefaultArguments = ['**/*.{css,scss,sass,svelte,html,astro,tsx,jsx,php,vue}']

await buildCommands('stylelint-config', '[Stylelint]', 'greenBright', {
	lint: {
		command: 'stylelint',
		defaultArguments: sharedDefaultArguments,
		options: sharedOptions,
	},
	fix: {
		command: 'stylelint',
		defaultArguments: sharedDefaultArguments,
		options: [...sharedOptions, '--fix'],
	},
	init: {
		command: {
			configFile: 'stylelint.config.js',
			configPackageJson: {
				stylelint: {
					extends: '@kitschpatrol/stylelint-config',
				},
			},
		},
	},
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
