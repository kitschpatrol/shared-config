#!/usr/bin/env node
import { buildCommands, executeJsonOutput } from '../../../src/command-builder.js'

await buildCommands('eslint-config', `[ESLint]`, 'magenta', {
	lint: {
		command: 'eslint',
		defaultArguments: ['.'],
	},
	fix: {
		command: 'eslint',
		defaultArguments: ['.'],
		options: ['--fix'],
	},
	init: {
		command: {
			// ESLint 9 does not support a configPackageJson key
			configFile: 'eslint.config.ts',
		},
	},
	printConfig: {
		async command(logStream, args) {
			return executeJsonOutput(
				logStream,
				{
					command: 'eslint',
					options: ['--print-config'],
				},
				args,
			)
		},
	},
})
