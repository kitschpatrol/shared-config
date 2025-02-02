#!/usr/bin/env node

import { buildCommands } from '../../../src/command-builder.js'

await buildCommands('typescript-config', '[TypeScript Config]', 'blueBright', {
	init: {}, // Use default implementation,
	lint: {
		command: 'tsc',
		options: ['--noEmit'],
	},
	printConfig: {
		command: 'tsc',
		options: ['--showConfig'],
	},
})
