import fse from 'fs-extra'
import path from 'node:path'
import type { Command, CommandDefinition } from '../../../src/command-builder.js'
import { DESCRIPTION } from '../../../src/command-builder.js'
import { findWorkspacePackageDirectories } from '../../../src/path-utilities.js'
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
async function getDeclaredDependencies(packageDirectory: string): Promise<Set<string>> {
	const packageJson = (await fse.readJson(path.join(packageDirectory, 'package.json'))) as {
		dependencies?: Record<string, string>
		devDependencies?: Record<string, string>
	}
	return new Set([
		...Object.keys(packageJson.dependencies ?? {}),
		...Object.keys(packageJson.devDependencies ?? {}),
	])
}

export type TypeScriptPackageContext = {
	dependencies: ReadonlySet<string>
	directory: string
	hasTypeScriptConfig: boolean
}

/** Build the checker plan from package dependency names. */
export function createTypeScriptLintCommands(
	dependencies: ReadonlySet<string>,
	cwdOverride = 'package-dir',
): Command[] {
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
				cwdOverride,
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
				cwdOverride,
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
			cwdOverride,
			name: 'tsc',
			optionFlags: ['--noEmit'],
		},
	]
}

/**
 * Build a monorepo checker plan without repeatedly checking the same inherited
 * root tsconfig. A package gets its own commands when it has a local
 * `tsconfig.json` or declares a framework checker that must run from that
 * package. If no local config exists anywhere, retain the previous behavior by
 * running from the invocation package so TypeScript can report the missing
 * configuration.
 */
export function createTypeScriptWorkspaceLintCommands(
	packages: readonly TypeScriptPackageContext[],
): Command[] {
	const hasAnyTypeScriptConfig = packages.some(({ hasTypeScriptConfig }) => hasTypeScriptConfig)

	return packages.flatMap(({ dependencies, directory, hasTypeScriptConfig }, index) => {
		const hasFrameworkChecker =
			dependencies.has('@astrojs/check') || dependencies.has('svelte-check')
		const isMissingConfigFallback = !hasAnyTypeScriptConfig && index === 0

		return hasTypeScriptConfig || hasFrameworkChecker || isMissingConfigFallback
			? createTypeScriptLintCommands(dependencies, directory)
			: []
	})
}

async function generateTypeScriptLintCommands(): Promise<Command[]> {
	const packageDirectories = findWorkspacePackageDirectories()
	const packages = await Promise.all(
		packageDirectories.map(async (directory): Promise<TypeScriptPackageContext> => {
			const [dependencies, hasTypeScriptConfig] = await Promise.all([
				getDeclaredDependencies(directory),
				fse.pathExists(path.join(directory, 'tsconfig.json')),
			])

			return { dependencies, directory, hasTypeScriptConfig }
		}),
	)

	return createTypeScriptWorkspaceLintCommands(packages)
}

export const commandDefinition: CommandDefinition = {
	commands: {
		init: {
			locationOptionFlag: false,
		},
		lint: {
			// Resolved lazily so project detection happens at execution time
			commands: generateTypeScriptLintCommands,
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
