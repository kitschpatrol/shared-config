import { type CommandDefinition } from '../../../src/command-builder-new.js'

export const commandDefinition: CommandDefinition = {
	command: 'eslint-config',
	description: 'ESLint shared configuration tools.',
	logColor: 'magenta',
	logPrefix: `[ESLint]`,
	subcommands: {
		fix: {
			commands: [
				{
					command: 'eslint',
					optionFlags: ['--fix'],
					receivePositionalArguments: true,
				},
			],
			description:
				'Fix your project with ESLint. This file-scoped command searches from the current working directory by default.',
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		init: {
			// ESLint 9 does not support configuration in package.json
			locationOptionFlag: false,
		},
		lint: {
			commands: [
				{
					command: 'eslint',
					receivePositionalArguments: true,
				},
			],
			description:
				'Lint your project with ESLint. This file-scoped command searches from the current working directory by default.',
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		// printConfig: {
		// 	async command(logStream, args) {
		// 		return executeJsonOutput(
		// 			logStream,
		// 			{
		// 				command: 'eslint',
		// 				options: ['--print-config'],
		// 			},
		// 			args,
		// 		)
		// 	},
		// },
	},
}
