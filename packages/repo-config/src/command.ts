import type { CommandDefinition } from '../../../src/command-builder.js'
import { DESCRIPTION } from '../../../src/command-builder.js'
import {
	copyrightYearFixerCommand,
	copyrightYearLinterCollect,
	copyrightYearLinterCommand,
} from './copyright-year-updater.js'
import {
	nodeVersionFixerCommand,
	nodeVersionLinterCollect,
	nodeVersionLinterCommand,
	printNodeVersionCommand,
} from './node-version-updater.js'

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					execute: copyrightYearFixerCommand,
					// Explicit name because function names are minified in builds
					name: 'copyright-year',
				},
				{
					execute: nodeVersionFixerCommand,
					name: 'node-version',
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
					collect: copyrightYearLinterCollect,
					execute: copyrightYearLinterCommand,
					// Explicit name because function names are minified in builds
					name: 'copyright-year',
				},
				{
					collect: nodeVersionLinterCollect,
					execute: nodeVersionLinterCommand,
					name: 'node-version',
				},
			],
			description: `Check the repo for common issues. ${DESCRIPTION.packageRun} ${DESCRIPTION.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
		printConfig: {
			commands: [
				{
					execute: printNodeVersionCommand,
					name: 'node-version',
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
