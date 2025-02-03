#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder-new.js'
import { getFilePathAtProjectRoot } from '../../../src/path-utils.js'

const sharedOptionFlags = [
	'--ignore-path',
	getFilePathAtProjectRoot('.gitignore') ?? '.gitignore',
	'--allow-empty-input',
]
const positionalArgumentDefault = '**/*.{css,scss,sass,svelte,html,astro,tsx,jsx,php,vue}'

await buildCommands('stylelint-config', 'Description goes here.', '[Stylelint]', 'greenBright', {
	fix: {
		commands: [
			{
				command: 'stylelint',
				optionFlags: [...sharedOptionFlags, '--fix'],
				receivePositionalArguments: true,
			},
		],
		description:
			'Fix your project with Stylelint. This file-scoped command searches from the current working directory by default.',
		positionalArgumentDefault,
		positionalArgumentMode: 'optional',
	},
	init: {
		configFile: 'stylelint.config.js',
		configPackageJson: {
			stylelint: {
				extends: '@kitschpatrol/stylelint-config',
			},
		},
		locationOptionFlag: true,
	},
	lint: {
		commands: [
			{
				command: 'stylelint',
				optionFlags: sharedOptionFlags,
				receivePositionalArguments: true,
			},
		],
		description:
			'Lint your project with Stylelint. This file-scoped command searches from the current working directory by default.',
		positionalArgumentDefault,
		positionalArgumentMode: 'optional',
	},
	// printConfig: {
	// 	async command(logStream, args) {
	// 		return executeJsonOutput(
	// 			logStream,
	// 			{
	// 				command: 'stylelint',
	// 				options: ['--print-config'],
	// 			},
	// 			args,
	// 		)
	// 	},
	// 	defaultArguments: ['.'],
	// },
})
