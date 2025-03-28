import type { CommandDefinition } from '../../../src/command-builder.js'
import { DESCRIPTION } from '../../../src/command-builder.js'
import { copyrightYearFixerCommand, copyrightYearLinterCommand } from './copyright-year-updater.js'

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					execute: copyrightYearFixerCommand,
					name: copyrightYearLinterCommand.name,
				},
			],
			description: `Fix common issues like outdated copyright years in license files. ${DESCRIPTION.packageRun} ${DESCRIPTION.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
		init: {
			locationOptionFlag: false,
		},
		lint: {
			commands: [
				{
					execute: copyrightYearLinterCommand,
					name: copyrightYearFixerCommand.name,
				},
			],
			description: `Check the repo for common issues. ${DESCRIPTION.packageRun} ${DESCRIPTION.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
	},
	description: "Kitschpatrol's repository-related shared configuration tools.",
	logColor: 'gray',
	logPrefix: '[Repo Config]',
	name: 'kpi-repo',
	order: 1,
}
