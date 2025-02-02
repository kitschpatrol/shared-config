#!/usr/bin/env node
import { buildCommands, execute } from '../../../src/command-builder.js'
import { createStreamTransform } from '../../../src/stream-utils.js'

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
		// Special case runs both regular mode and production mode
		async command(logStream) {
			let resultAccumulator = 0

			resultAccumulator += await execute(logStream, {
				command: 'knip',
				options: ['--no-progress', '--no-config-hints'],
			})

			// Prefix the production run
			const logStreamSubA = createStreamTransform('[Production]', 'cyan')
			logStreamSubA.pipe(logStream)

			resultAccumulator += await execute(logStreamSubA, {
				command: 'knip',
				options: ['--no-progress', '--no-config-hints', '--production'],
			})

			return resultAccumulator
		},
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
