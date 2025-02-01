#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js'

await buildCommands('mdat-config', '[Mdat Config]', 'green', {
	fix: {
		command: 'mdat',
		defaultArguments: ['readme.md'],
		options: ['readme', 'expand'],
	},
	init: {
		command: {
			configFile: 'mdat.config.ts',
			configPackageJson: {
				mdat: '@kitschpatrol/mdat-config',
			},
		},
	},
	lint: {
		command: 'mdat',
		defaultArguments: ['readme.md'],
		options: ['readme', 'check'],
	},
	printConfig: {}, // Use default implementation,
})
