#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js'

await buildCommands('knip-config', '[Knip]', 'cyanBright', {
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
	lint: {
		command: 'knip',
		// Consider
		// options: ['--no-progress', '--no-config-hints']
	},
	// TODO
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
