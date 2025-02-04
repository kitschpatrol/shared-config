import { type CommandDefinition } from '../../../src/command-builder.js'

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					name: 'eslint',
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
					name: 'eslint',
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
	description: 'ESLint shared configuration tools.',
	logColor: 'magenta',
	logPrefix: `[ESLint]`,
	name: 'eslint-config',
}
