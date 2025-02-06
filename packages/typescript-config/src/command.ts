import { type CommandDefinition, DESCRIPTIONS } from '../../../src/command-builder.js'

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
			// TODO confirm monorepo behavior
			description: `Run type checking on your project. ${DESCRIPTIONS.packageRun} ${DESCRIPTIONS.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
		printConfig: {
			commands: [
				{
					name: 'tsc',
					optionFlags: ['--showConfig'],
					prettyJsonOutput: true,
				},
			],
			// TODO confirm monorepo behavior
			description: `Print the TypeScript configuration for the project. ${DESCRIPTIONS.packageSearch} ${DESCRIPTIONS.monorepoSearch}`,
			positionalArgumentMode: 'none',
		},
	},
	description: "Kitschpatrol's TypeScript shared configuration tools.",
	logColor: 'blueBright',
	logPrefix: '[TypeScript Config]',
	name: 'kpsc-typescript',
}
