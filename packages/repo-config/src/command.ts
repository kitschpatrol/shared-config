import type { CommandDefinition } from '../../../src/command-builder.js'
import { DESCRIPTION } from '../../../src/command-builder.js'
import { copyrightYearFixerCommand, copyrightYearLinterCommand } from './copyright-year-updater.js'
import {
	nodeVersionFixerCommand,
	nodeVersionLinterCommand,
	printNodeVersionCommand,
} from './node-version-updater.js'

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					execute: copyrightYearFixerCommand,
					name: copyrightYearLinterCommand.name,
				},
				{
					execute: nodeVersionFixerCommand,
					name: nodeVersionFixerCommand.name,
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
				{
					execute: nodeVersionLinterCommand,
					name: nodeVersionLinterCommand.name,
				},
			],
			description: `Check the repo for common issues. ${DESCRIPTION.packageRun} ${DESCRIPTION.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
		printConfig: {
			commands: [
				{
					execute: printNodeVersionCommand,
					name: printNodeVersionCommand.name,
				},
			],
			description: 'Print minimum Node.js version constraints from the pnpm lockfile.',
			positionalArgumentMode: 'none',
		},
	},
	description: "Kitschpatrol's repository-related shared configuration tools.",
	logColor: 'gray',
	logPrefix: '[Repo Config]',
	name: 'ksc-repo',
	order: 1,
}
