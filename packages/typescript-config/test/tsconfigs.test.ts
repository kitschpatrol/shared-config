import { execa } from 'execa'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import ts from 'typescript'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let fixtureRoot: string

/**
 * Creates a fixture project with a node_modules link back to this package so
 * tsconfig extends resolution works exactly as it does for consumers.
 */
async function createFixture(name: string, files: Record<string, string>): Promise<string> {
	const fixtureDirectory = path.join(fixtureRoot, name)
	const packageDirectory = path.resolve(import.meta.dirname, '..')
	const linkPath = path.join(fixtureDirectory, 'node_modules', '@kitschpatrol', 'typescript-config')
	await fs.mkdir(path.dirname(linkPath), { recursive: true })
	// Junction links don't require elevation on Windows, type is ignored elsewhere
	await fs.symlink(packageDirectory, linkPath, 'junction')

	for (const [filePath, contents] of Object.entries(files)) {
		const absolutePath = path.join(fixtureDirectory, filePath)
		await fs.mkdir(path.dirname(absolutePath), { recursive: true })
		await fs.writeFile(absolutePath, contents, 'utf8')
	}

	return fixtureDirectory
}

/**
 * Resolves a fixture's tsconfig.json the same way tsc does, including extends
 * resolution through package.json exports.
 */
function parseConfig(fixtureDirectory: string): ts.ParsedCommandLine {
	const configPath = path.join(fixtureDirectory, 'tsconfig.json')
	const parsed = ts.getParsedCommandLineOfConfigFile(
		configPath,
		{},
		{
			...ts.sys,
			onUnRecoverableConfigFileDiagnostic(diagnostic) {
				throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
			},
		},
	)

	if (parsed === undefined) {
		throw new Error(`Failed to parse config at ${configPath}`)
	}

	return parsed
}

beforeAll(async () => {
	fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'ksc-tsconfig-test-'))
})

afterAll(async () => {
	await fs.rm(fixtureRoot, { force: true, recursive: true })
})

describe('base export', () => {
	it('resolves through the package root export', async () => {
		const fixture = await createFixture('base', {
			'src/index.ts': 'export const value = 1\n',
			'tsconfig.json': '{ "extends": "@kitschpatrol/typescript-config" }\n',
		})
		const parsed = parseConfig(fixture)

		expect(parsed.options.target).toBe(ts.ScriptTarget.ES2025)
		expect(parsed.options.jsx).toBe(ts.JsxEmit.React)
		expect(parsed.options.noUncheckedIndexedAccess).toBe(true)
	})

	it('is found by tsc from a nested package without its own config', async () => {
		const fixture = await createFixture('config-search', {
			'packages/nested/package.json': '{ "name": "nested", "private": true }\n',
			'src/index.ts': 'export const value = 1\n',
			'tsconfig.json': '{ "extends": "@kitschpatrol/typescript-config" }\n',
		})
		const typescriptCli = path.resolve(
			import.meta.dirname,
			'../../../node_modules/typescript/bin/tsc',
		)
		const { stdout } = await execa(process.execPath, [typescriptCli, '--showConfig'], {
			cwd: path.join(fixture, 'packages/nested'),
		})
		const config = JSON.parse(stdout) as { compilerOptions?: { target?: string } }

		expect(config.compilerOptions?.target).toBe('es2025')
	})
})

describe('astro export', () => {
	it('mirrors the Astro preset over the base config', async () => {
		const fixture = await createFixture('astro', {
			'.astro/types.d.ts': 'declare const astroContentTypes: string\n',
			'dist/excluded.ts': 'export const value = 1\n',
			'src/index.ts': 'export const value = 1\n',
			'tsconfig.json': '{ "extends": "@kitschpatrol/typescript-config/astro" }\n',
		})
		const parsed = parseConfig(fixture)

		// Astro-specific overrides
		expect(parsed.options.jsx).toBe(ts.JsxEmit.Preserve)
		expect(parsed.options.esModuleInterop).toBe(true)
		expect(parsed.options.lib).toContain('lib.dom.iterable.d.ts')

		// Inherited from base
		expect(parsed.options.checkJs).toBe(true)
		expect(parsed.options.noUncheckedIndexedAccess).toBe(true)
		expect(parsed.options.verbatimModuleSyntax).toBe(true)

		// The ${configDir} include and exclude resolve against the project root
		const fileNames = parsed.fileNames.map((file) => file.replaceAll('\\', '/'))
		expect(fileNames.some((file) => file.endsWith('src/index.ts'))).toBe(true)
		expect(fileNames.some((file) => file.endsWith('.astro/types.d.ts'))).toBe(true)
		expect(fileNames.some((file) => file.endsWith('dist/excluded.ts'))).toBe(false)
	})
})

describe('svelte export', () => {
	it('layers under the generated SvelteKit config', async () => {
		const generatedConfig = JSON.stringify({
			compilerOptions: {
				isolatedModules: true,
				lib: ['esnext', 'DOM', 'DOM.Iterable'],
				module: 'esnext',
				moduleResolution: 'bundler',
				noEmit: true,
				paths: { $lib: ['../src/lib'], '$lib/*': ['../src/lib/*'] },
				rootDirs: ['..', './types'],
				target: 'esnext',
				verbatimModuleSyntax: true,
			},
			exclude: ['../node_modules/**'],
			include: ['ambient.d.ts', '../src/**/*.js', '../src/**/*.ts', '../src/**/*.svelte'],
		})
		const projectConfig = JSON.stringify({
			extends: ['@kitschpatrol/typescript-config/svelte', './.svelte-kit/tsconfig.json'],
		})
		const fixture = await createFixture('svelte', {
			'.svelte-kit/tsconfig.json': generatedConfig,
			'src/lib/index.ts': 'export const value = 1\n',
			'tsconfig.json': projectConfig,
		})
		const parsed = parseConfig(fixture)

		// Svelte-specific overrides
		expect(parsed.options.esModuleInterop).toBe(true)
		expect(parsed.options.rewriteRelativeImportExtensions).toBe(true)
		expect(parsed.options.sourceMap).toBe(true)

		// The generated config comes last in extends, so its options win
		expect(parsed.options.target).toBe(ts.ScriptTarget.ESNext)
		expect(parsed.options.paths?.$lib).toEqual(['../src/lib'])
		expect(parsed.options.rootDirs).toHaveLength(2)

		// Inherited from base
		expect(parsed.options.checkJs).toBe(true)
		expect(parsed.options.noUncheckedIndexedAccess).toBe(true)

		// The generated config's include governs file selection
		const fileNames = parsed.fileNames.map((file) => file.replaceAll('\\', '/'))
		expect(fileNames.some((file) => file.endsWith('src/lib/index.ts'))).toBe(true)
	})
})
