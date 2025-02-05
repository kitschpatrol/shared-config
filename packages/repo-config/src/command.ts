import { type CommandDefinition } from '../../../src/command-builder.js'
import { copyrightYearFixer, copyrightYearLinter } from './copyright-year-updater.js'

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					execute: copyrightYearLinter,
					name: 'copyright year',
				},
			],
			description:
				'Fix common issues. This is a package-scoped command. In a monorepo, it will also operate on any packages below the current working directory.',
			positionalArgumentMode: 'none',
		},
		init: {
			locationOptionFlag: false,
		},
		lint: {
			commands: [
				{
					execute: copyrightYearFixer,
					name: 'copyright year',
				},
			],
			description:
				'Check the repo for common issues. This is a package-scoped command. In a monorepo, it will also operate on any packages below the current working directory.',
			positionalArgumentMode: 'none',
		},
	},
	description: 'Repo related.',
	logColor: 'gray',
	logPrefix: '[Repo Config]',
	name: 'repo-config',
}
