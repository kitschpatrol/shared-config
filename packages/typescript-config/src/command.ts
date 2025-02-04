import { type CommandDefinition } from '../../../src/command-builder-new.js'

export const commandDefinition: CommandDefinition = {
	command: 'typescript-config',
	description: 'TK. No fix.',
	logColor: 'blueBright',
	logPrefix: '[TypeScript Config]',
	subcommands: {
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
	},
}
