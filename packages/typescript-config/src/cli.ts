#!/usr/bin/env node

import { buildCommands } from '../../../src/command-builder-new.js'

await buildCommands('typescript-config', 'TK. No fix.', '[TypeScript Config]', 'blueBright', {
	init: {
		locationOptionFlag: false,
	},
	lint: {
		commands: [
			{
				command: 'tsc',
				cwdOverride: 'package-dir',
				optionFlags: ['--noEmit'],
			},
		],
		description:
			'Run type checking on your project. This package-scoped command typechecks from the nearest package root directory. In a monorepo, it will also typecheck any packages below the current working directory.',
		positionalArgumentMode: 'none',
	},
	// printConfig: {
	// 	command: 'tsc',
	// 	options: ['--showConfig'],
	// },
})
