#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js'

await buildCommands('remark-config', '[remarklint]', 'blue', {
	init: {
		command: {
			// Note that remark.config.js is not detected by the config resolver ಠ_ಠ
			configFile: '.remarkrc.js',
			configPackageJson: {
				remarkConfig: {
					plugins: ['@kitschpatrol/remark-config'],
				},
			},
		},
	},
	printConfig: {},
})
