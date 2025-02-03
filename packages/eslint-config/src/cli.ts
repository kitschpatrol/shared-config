#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder-new.js'

await buildCommands('eslint-config', 'Eslint shared configuration tools.', `[ESLint]`, 'magenta', {
	fix: {
		commands: [
			{
				command: 'eslint',
				optionFlags: ['--fix'],
				receivePositionalArguments: true,
			},
		],
		description:
			'Lint your project with ESLint. This file-scoped command searches from the current working directory by default.',
		positionalArgumentDefault: '.',
		positionalArgumentMode: 'optional',
	},
	init: {
		// ESLint 9 does not support configuration in package.json
		locationOptionFlag: false,
	},
	lint: {
		commands: [
			{
				command: 'eslint',
				receivePositionalArguments: true,
			},
		],
		description:
			'Lint your project with ESLint. This file-scoped command searches from the current working directory by default.',
		positionalArgumentDefault: '.',
		positionalArgumentMode: 'optional',
	},
	// printConfig: {
	// 	async command(logStream, args) {
	// 		return executeJsonOutput(
	// 			logStream,
	// 			{
	// 				command: 'eslint',
	// 				options: ['--print-config'],
	// 			},
	// 			args,
	// 		)
	// 	},
	// },
})
