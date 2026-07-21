import fse from 'fs-extra'
import path from 'node:path'
import type { Command, CommandDefinition } from '../../../src/command-builder.js'
import { DESCRIPTION } from '../../../src/command-builder.js'
import { getPackageDirectory } from '../../../src/path-utilities.js'
import { isAstroCheckNoise, parseAstroCheckOutput } from './check-adapters/astro.js'
import { isSvelteCheckNoise, parseSvelteCheckOutput } from './check-adapters/svelte.js'
import { parseTscOutput } from './check-adapters/tsc.js'

export { isAstroCheckNoise, parseAstroCheckOutput } from './check-adapters/astro.js'
export { isSvelteCheckNoise, parseSvelteCheckOutput } from './check-adapters/svelte.js'
export { parseTscOutput } from './check-adapters/tsc.js'

/**
 * Returns the names of all dependencies and devDependencies declared in the
 * package's package.json. Declaring a framework-specific type checker like
 * `svelte-check` or `@astrojs/check` is an explicit signal that it's the
 * intended type checker for the project.
 */
async function getDeclaredDependencies(): Promise<Set<string>> {
	const packageDirectory = getPackageDirectory()
	const packageJson = (await fse.readJson(path.join(packageDirectory, 'package.json'))) as {
		dependencies?: Record<string, string>
		devDependencies?: Record<string, string>
	}
	return new Set([
		...Object.keys(packageJson.dependencies ?? {}),
		...Object.keys(packageJson.devDependencies ?? {}),
	])
}

/** Build the checker plan from package dependency names. */
export function createTypeScriptLintCommands(dependencies: ReadonlySet<string>): Command[] {
	// TSC ignores .astro and .svelte files and can't resolve imports of them
	// from plain .ts files, so projects that declare the framework-specific
	// checkers use those instead.
	// See https://github.com/sveltejs/language-tools/issues/2527
	const hasAstroCheck = dependencies.has('@astrojs/check')
	const hasSvelteCheck = dependencies.has('svelte-check')

	if (hasAstroCheck || hasSvelteCheck) {
		const commands: Command[] = []
		if (hasAstroCheck) {
			// Covers .astro files plus everything in the project tsconfig
			commands.push({
				collect: {
					// Astro logger events become one-line JSON records. @astrojs/check's
					// file diagnostics remain text and are handled by the same adapter.
					optionFlags: ['--json'],
					parse: parseAstroCheckOutput,
				},
				cwdOverride: 'package-dir',
				name: 'astro',
				outputFilter: isAstroCheckNoise,
				subcommands: ['check'],
			})
		}

		if (hasSvelteCheck) {
			// With --tsconfig, svelte-check covers plain .ts/.js files in addition
			// to .svelte files. When astro check already covers those (Astro
			// project with Svelte islands), only check .svelte files.
			const optionFlags = hasAstroCheck ? [] : ['--tsconfig', './tsconfig.json']
			commands.push({
				collect: {
					optionFlags: [...optionFlags, '--output', 'machine-verbose'],
					parse: parseSvelteCheckOutput,
				},
				cwdOverride: 'package-dir',
				name: 'svelte-check',
				optionFlags,
				outputFilter: isSvelteCheckNoise,
			})
		}

		return commands
	}

	return [
		{
			collect: {
				parse: parseTscOutput,
			},
			cwdOverride: 'package-dir',
			name: 'tsc',
			optionFlags: ['--noEmit'],
		},
	]
}

async function generateTypeScriptLintCommands(): Promise<Command[]> {
	return createTypeScriptLintCommands(await getDeclaredDependencies())
}

export const commandDefinition: CommandDefinition = {
	commands: {
		init: {
			locationOptionFlag: false,
		},
		lint: {
			// Resolved lazily so project detection happens at execution time
			commands: generateTypeScriptLintCommands,
			// TODO confirm monorepo behavior
			description: `Run type checking on your project. ${DESCRIPTION.packageRun} ${DESCRIPTION.monorepoRun}`,
			positionalArgumentMode: 'none',
			showResolvedCommands: true,
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
