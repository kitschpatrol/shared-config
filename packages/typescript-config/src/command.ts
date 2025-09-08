import fse from 'fs-extra'
import path from 'node:path'
import type { Command, CommandDefinition } from '../../../src/command-builder.js'
import { DESCRIPTION } from '../../../src/command-builder.js'
import { getPackageDirectory } from '../../../src/path-utilities.js'

/**
 * Checks if the current project is a Svelte project by looking for Svelte configuration files
 *
 * Won't be 100% accurate since custom Svelte config file names are possible.
 * @returns Promise that resolves to true if Svelte configuration files are found
 */
async function isSvelteProject(): Promise<boolean> {
	const packageDirectory = getPackageDirectory()
	const svelteConfigFiles = ['svelte.config.js', 'svelte.config.mjs', 'svelte.config.cjs']
	const fileChecks = svelteConfigFiles.map(async (configFile) =>
		fse.exists(path.join(packageDirectory, configFile)),
	)
	const results = await Promise.all(fileChecks)
	return results.some(Boolean)
}

// eslint-disable-next-line ts/require-await
async function printSvelteWarningCommand(logStream: NodeJS.WritableStream): Promise<number> {
	logStream.write(
		'Skipping `tsc` since this is a Svelte project. Consider running `svelte-check` instead.\n',
	)

	return 0
}

async function generateTypeScriptLintCommand(): Promise<Command[]> {
	return (await isSvelteProject())
		? [
				{
					execute: printSvelteWarningCommand,
					name: printSvelteWarningCommand.name,
				},
			]
		: [
				{
					cwdOverride: 'package-dir',
					name: 'tsc',
					optionFlags: ['--noEmit'],
				},
			]
}

export const commandDefinition: CommandDefinition = {
	commands: {
		init: {
			locationOptionFlag: false,
		},
		lint: {
			// Needs some special logic since tsc doesn't really work in Svelte projects
			// See https://github.com/sveltejs/language-tools/issues/2527
			commands: await generateTypeScriptLintCommand(),
			// TODO confirm monorepo behavior
			description: `Run type checking on your project. ${DESCRIPTION.packageRun} ${DESCRIPTION.monorepoRun}`,
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
			description: `Print the TypeScript configuration for the project. ${DESCRIPTION.packageSearch} ${DESCRIPTION.monorepoSearch}`,
			positionalArgumentMode: 'none',
		},
	},
	description: "Kitschpatrol's TypeScript shared configuration tools.",
	logColor: 'blueBright',
	logPrefix: '[TypeScript Config]',
	name: 'ksc-typescript',
	order: 3,
}
