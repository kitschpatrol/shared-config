import { type CommandDefinition, DESCRIPTIONS } from '../../../src/command-builder.js'
import { copyrightYearFixerCommand, copyrightYearLinterCommand } from './copyright-year-updater.js'

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					execute: copyrightYearLinterCommand,
					name: copyrightYearLinterCommand.name,
				},
			],
			description: `Fix common issues like outdated copyright years in license files. ${DESCRIPTIONS.packageRun} ${DESCRIPTIONS.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
		init: {
			locationOptionFlag: false,
		},
		lint: {
			commands: [
				{
					execute: copyrightYearFixerCommand,
					name: copyrightYearFixerCommand.name,
				},
			],
			description: `Check the repo for common issues. ${DESCRIPTIONS.packageRun} ${DESCRIPTIONS.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
	},
	description: "Kitschpatrol's repository-related shared configuration tools.",
	logColor: 'gray',
	logPrefix: '[Repo Config]',
	name: 'kpsc-repo',
	order: 1,
}
