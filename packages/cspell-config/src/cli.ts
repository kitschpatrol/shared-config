#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js'

// TODO fix? fixed through eslint?

await buildCommands('cspell-config', '[CSpell]', 'cyan', {
	lint: {
		command: 'cspell',
		defaultArguments: ['.'],
		options: ['--quiet'],
	},
	init: {
		command: {
			configFile: 'cspell.config.json',
			configPackageJson: {
				cspell: {
					import: '@kitschpatrol/cspell-config',
				},
			},
		},
	},
	printConfig: {
		// Doesn't work with executeJsonOutput
		// because of json parsing errors (regex related)
		command: 'cspell',
		defaultArguments: ['.'],
		options: ['--debug', '--no-exit-code', '--no-color'],
	},
})
