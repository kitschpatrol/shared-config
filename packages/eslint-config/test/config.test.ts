import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { TypedFlatConfigItem } from '../src/types.js'
import { eslintConfig } from '../src/config.js'

let tempDirectory: string

type ParserOptions = {
	project?: unknown
	projectService?: unknown
	tsconfigRootDir?: unknown
}

beforeAll(async () => {
	tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'eslint-config-test-'))
})

afterAll(async () => {
	await fs.rm(tempDirectory, { force: true, recursive: true })
})

async function getConfigs(tsconfigRootDirectory: string): Promise<TypedFlatConfigItem[]> {
	return eslintConfig({
		astro: false,
		gitignore: false,
		isInEditor: false,
		react: false,
		svelte: false,
		tsconfigRootDirectory,
	})
}

function getConfig(configs: TypedFlatConfigItem[], name: string): TypedFlatConfigItem {
	const config = configs.find((candidate) => candidate.name === name)
	expect(config, `Missing config ${name}`).toBeDefined()
	return config!
}

function getParserOptions(config: TypedFlatConfigItem): ParserOptions {
	return config.languageOptions?.parserOptions ?? {}
}

function getProjectService(config: TypedFlatConfigItem): unknown {
	return getParserOptions(config).projectService
}

describe('type-aware auto-detection', () => {
	it('disables typed linting when no tsconfig is found', async () => {
		const projectDirectory = path.join(tempDirectory, 'without-tsconfig')
		await fs.mkdir(projectDirectory)

		const configs = await getConfigs(projectDirectory)

		expect(getProjectService(getConfig(configs, 'kp/js/rules'))).toBe(false)
		expect(getProjectService(getConfig(configs, 'kp/ts/rules'))).toBe(false)
	})

	it('enables TypeScript but not JavaScript when checkJs is disabled', async () => {
		const projectDirectory = path.join(tempDirectory, 'typescript-only')
		await fs.mkdir(projectDirectory)
		await fs.writeFile(path.join(projectDirectory, 'tsconfig.json'), '{}\n')

		const configs = await getConfigs(projectDirectory)

		expect(getProjectService(getConfig(configs, 'kp/js/rules'))).toBe(false)
		expect(getProjectService(getConfig(configs, 'kp/ts/rules'))).toBe(true)
	})

	it('resolves inherited checkJs for JavaScript', async () => {
		const projectDirectory = path.join(tempDirectory, 'check-js')
		await fs.mkdir(projectDirectory)
		await fs.writeFile(
			path.join(projectDirectory, 'tsconfig.base.json'),
			'{"compilerOptions":{"checkJs":true}}\n',
		)
		await fs.writeFile(
			path.join(projectDirectory, 'tsconfig.json'),
			'{"extends":"./tsconfig.base.json"}\n',
		)

		const configs = await getConfigs(projectDirectory)

		expect(getProjectService(getConfig(configs, 'kp/js/rules'))).toBe(true)
		expect(getProjectService(getConfig(configs, 'kp/ts/rules'))).toBe(true)
	})

	it('honors explicit per-language overrides without requiring ignores', async () => {
		const projectDirectory = path.join(tempDirectory, 'explicit')
		await fs.mkdir(projectDirectory)

		const configs = await eslintConfig({
			astro: false,
			gitignore: false,
			isInEditor: false,
			js: { typeAware: { enabled: true } },
			react: false,
			svelte: false,
			ts: { typeAware: { enabled: false } },
			tsconfigRootDirectory: projectDirectory,
		})

		expect(getProjectService(getConfig(configs, 'kp/js/rules'))).toBe(true)
		expect(getProjectService(getConfig(configs, 'kp/ts/rules'))).toBe(false)
	})
})

describe('ESLint 10 config lookup compatibility', () => {
	it('infers the selected package-local eslint config directory instead of cwd', async () => {
		const projectDirectory = path.join(tempDirectory, 'nested-config')
		await fs.mkdir(projectDirectory)
		await fs.writeFile(path.join(projectDirectory, 'tsconfig.json'), '{}\n')

		const configDirectory = path.join(projectDirectory, 'config')
		await fs.mkdir(configDirectory)
		const configModulePath = path.join(configDirectory, 'eslint.config.mjs')
		await fs.writeFile(
			configModulePath,
			'export function callFactory(factory) { return factory() }\n',
		)

		const configModule = (await import(pathToFileURL(configModulePath).href)) as {
			callFactory: <T>(factory: () => T) => T
		}
		const configs = await configModule.callFactory(async () => {
			const selectedConfigs = await eslintConfig({
				astro: false,
				gitignore: false,
				isInEditor: false,
				react: false,
				svelte: false,
			})
			return selectedConfigs
		})

		// The repository cwd has checkJs enabled. The selected nested config does not.
		expect(getProjectService(getConfig(configs, 'kp/js/rules'))).toBe(false)
		expect(getProjectService(getConfig(configs, 'kp/ts/rules'))).toBe(true)
		expect(getParserOptions(getConfig(configs, 'kp/ts/rules')).tsconfigRootDir).toBe(
			projectDirectory,
		)
	})
})

describe('framework type-aware propagation', () => {
	it('disables typed rules and parser services when no tsconfig is found', async () => {
		const projectDirectory = path.join(tempDirectory, 'frameworks-without-tsconfig')
		await fs.mkdir(projectDirectory)

		const configs = await eslintConfig({
			astro: true,
			gitignore: false,
			isInEditor: false,
			react: true,
			svelte: true,
			tsconfigRootDirectory: projectDirectory,
		})

		const astroRules = getConfig(configs, 'kp/astro/rules')
		expect(getParserOptions(astroRules).project).toBeUndefined()
		expect(astroRules.rules?.['ts/await-thenable']).toBe('off')

		const reactRules = getConfig(configs, 'kp/react/rules')
		expect(reactRules.rules?.['react/no-leaked-conditional-rendering']).toBe('off')

		const svelteRules = getConfig(configs, 'kp/svelte/rules')
		expect(getProjectService(svelteRules)).toBe(false)
		expect(svelteRules.rules?.['ts/await-thenable']).toBe('off')
	})

	it('uses TypeScript detection and separately disables JavaScript', async () => {
		const projectDirectory = path.join(tempDirectory, 'frameworks')
		await fs.mkdir(projectDirectory)
		await fs.writeFile(path.join(projectDirectory, 'tsconfig.json'), '{}\n')

		const configs = await eslintConfig({
			astro: true,
			gitignore: false,
			isInEditor: false,
			react: true,
			svelte: true,
			tsconfigRootDirectory: projectDirectory,
		})

		const reactDisable = getConfig(configs, 'kp/react/disable-type-aware-by-language')
		expect(reactDisable.files).toEqual(['**/*.?([cm])js', '**/*.?([cm])jsx'])

		const svelteRules = getConfig(configs, 'kp/svelte/rules')
		expect(getProjectService(svelteRules)).toBe(true)
		expect(getParserOptions(svelteRules).tsconfigRootDir).toBe(projectDirectory)
		expect(getConfig(configs, 'kp/svelte/disable-type-aware-by-language').files).toEqual([
			'**/*.svelte.js',
		])

		const astroRules = getConfig(configs, 'kp/astro/rules')
		expect(getParserOptions(astroRules).project).toBe(true)
		expect(getParserOptions(astroRules).tsconfigRootDir).toBe(projectDirectory)
	})
})
