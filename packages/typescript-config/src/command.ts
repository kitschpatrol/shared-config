import { type CommandDefinition } from '../../../src/command-builder.js'

export const commandDefinition: CommandDefinition = {
	commands: {
		init: {
			locationOptionFlag: false,
		},
		lint: {
			commands: [
				{
					cwdOverride: 'package-dir',
					name: 'tsc',
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
	},
	description: 'TK. No fix.',
	logColor: 'blueBright',
	logPrefix: '[TypeScript Config]',
	name: 'typescript-config',
}
