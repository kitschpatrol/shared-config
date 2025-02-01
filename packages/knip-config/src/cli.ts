#!/usr/bin/env node
import { buildCommands, executeJsonOutput } from '../../../src/command-builder.js'



await buildCommands('stylelint-config', '[Stylelint]', 'greenBright', {
	lint: {
		command: 'knip',
		// options: ['--no-progress', '--no-config-hints']
	},
	fix: {
		command: 'knip',
		options: ['--fix', '--allow-remove-files'],
	},
	init: {
		command: {
			configFile: 'knip.config.ts',
			configPackageJson: {
				knip: '@kitschpatrol/knip-config',
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
