#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js'

await buildCommands('mdat-config', '[Mdat Config]', 'green', {
	check: {
		command: 'mdat',
		defaultArguments: ['readme.md'],
		options: ['readme', 'check'],
	},
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
	printConfig: {},
})
