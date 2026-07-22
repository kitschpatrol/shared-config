import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { TypedFlatConfigItem } from '../src/types.js'
import { eslintConfig } from '../src/config.js'
import { disables, js, jsx, svelte, ts, tsx } from '../src/configs/index.js'
import { sharedScriptConfig } from '../src/configs/shared-js-ts.js'
import { sharedJsxTsxConfig } from '../src/configs/shared-jsx-tsx.js'
import { GLOB_SVELTE, GLOB_SVELTE_JS, GLOB_SVELTE_TS } from '../src/globs.js'
import { tsParser } from '../src/parsers.js'

let tempDirectory: string

type ParserOptions = {
	ecmaFeatures?: unknown
	extraFileExtensions?: unknown
	parser?: unknown
	project?: unknown
	projectService?: unknown
	svelteConfig?: unknown
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

describe('core script config layering', () => {
	it('extends the complete shared script config for JSX and TSX', async () => {
		const sharedConfigProperties = Object.fromEntries(
			Object.entries(sharedScriptConfig).filter(([key]) => key !== 'plugins' && key !== 'rules'),
		)
		expect(sharedJsxTsxConfig).toMatchObject(sharedConfigProperties)
		expect(sharedJsxTsxConfig.plugins).toMatchObject(sharedScriptConfig.plugins ?? {})
		expect(sharedJsxTsxConfig.plugins?.ts).toBe(sharedScriptConfig.plugins?.ts)
		expect(sharedJsxTsxConfig.plugins?.['jsx-a11y']).toBeDefined()
		expect(sharedJsxTsxConfig.rules?.['no-await-in-loop']).toBe('off')
		expect(sharedJsxTsxConfig.rules?.['jsx-a11y/alt-text']).toBeDefined()

		const [jsxConfigs, tsxConfigs] = await Promise.all([
			jsx({ typeAware: { enabled: false } }),
			tsx({ typeAware: { enabled: false } }),
		])
		for (const config of [
			getConfig(jsxConfigs, 'kp/jsx/rules'),
			getConfig(tsxConfigs, 'kp/tsx/rules'),
		]) {
			expect(config.plugins?.ts).toBe(sharedScriptConfig.plugins?.ts)
			expect(config.plugins?.['jsx-a11y']).toBeDefined()
			expect(getParserOptions(config).ecmaFeatures).toMatchObject({ jsx: true })
		}
	})

	it('keeps CJS overrides with the JavaScript config', async () => {
		const jsConfigs = await js({ typeAware: { enabled: false } })
		const cjsConfig = getConfig(jsConfigs, 'kp/js/cjs')
		expect(cjsConfig.files).toEqual(['**/*.cjs'])
		expect(cjsConfig.rules?.['ts/no-require-imports']).toBe('off')

		const finalConfigs = await disables()
		expect(finalConfigs.some((config) => config.name === 'kp/disables/cjs')).toBe(false)
	})

	it('folds declaration-file overrides into the TypeScript config', async () => {
		const tsConfigs = await ts({ typeAware: { enabled: false } })
		const declarationConfig = getConfig(tsConfigs, 'kp/ts/dts')
		expect(declarationConfig.files).toEqual(['**/*.d.?([cm])ts'])
		expect(declarationConfig.rules).toMatchObject({
			'eslint-comments/no-unlimited-disable': 'off',
			'import/no-duplicates': 'off',
			'no-restricted-syntax': 'off',
		})

		const finalConfigs = await disables()
		expect(finalConfigs.some((config) => config.name === 'kp/disables/dts')).toBe(false)
	})
})

describe('Svelte config layering', () => {
	it('separates shared scripts, components, and Svelte modules', async () => {
		const configs = await svelte({
			tsconfigRootDirectory: tempDirectory,
			typeAware: { enabled: false },
			typeAwareJavaScript: false,
		})
		const files = [GLOB_SVELTE, GLOB_SVELTE_JS, GLOB_SVELTE_TS]

		const scriptConfig = getConfig(configs, 'kp/svelte/scripts')
		expect(scriptConfig.files).toEqual(files)
		expect(scriptConfig.plugins?.ts).toBe(sharedScriptConfig.plugins?.ts)
		expect(scriptConfig.processor).toBeUndefined()
		expect(getParserOptions(scriptConfig)).toMatchObject({
			extraFileExtensions: ['.svelte'],
			parser: {
				js: tsParser,
				ts: tsParser,
				typescript: tsParser,
			},
			projectService: false,
			tsconfigRootDir: tempDirectory,
		})
		expect(getParserOptions(scriptConfig).svelteConfig).toBeUndefined()
		expect(scriptConfig.rules?.['ts/no-unused-expressions']).toBe('off')

		const componentConfig = getConfig(configs, 'kp/svelte/component')
		expect(componentConfig.files).toEqual([GLOB_SVELTE])
		expect(componentConfig.processor).toBe('svelte/svelte')
		expect(componentConfig.rules).toMatchObject({
			'no-inner-declarations': 'off',
			'no-self-assign': 'off',
			'svelte/spaced-html-comment': 'error',
		})
		expect(componentConfig.rules?.['unicorn/filename-case']).toBeDefined()

		const moduleConfig = getConfig(configs, 'kp/svelte/modules')
		expect(moduleConfig.files).toEqual([GLOB_SVELTE_JS, GLOB_SVELTE_TS])
		expect(moduleConfig.processor).toBeUndefined()
		expect(moduleConfig.rules?.['unicorn/filename-case']).toBeDefined()
	})

	it('keeps general overrides and SvelteKit exceptions in named layers', async () => {
		const configs = await svelte({
			overrides: { 'svelte/button-has-type': 'off' },
			typeAware: { enabled: false },
		})

		const rulesConfig = getConfig(configs, 'kp/svelte/rules')
		expect(rulesConfig.files).toEqual([GLOB_SVELTE, GLOB_SVELTE_JS, GLOB_SVELTE_TS])
		expect(rulesConfig.rules?.['svelte/comment-directive']).toBe('error')
		expect(rulesConfig.rules?.['svelte/button-has-type']).toBe('off')

		const routeConfig = getConfig(configs, 'kp/svelte/sveltekit-routes')
		expect(routeConfig.files).toEqual(['**/routes/**/+*.ts'])
		expect(routeConfig.rules?.['ts/no-throw-literal']).toBe('off')

		const appConfig = getConfig(configs, 'kp/svelte/sveltekit-app')
		expect(appConfig.files).toEqual(['src/app.html'])
		expect(appConfig.rules?.['html/require-title']).toBe('off')
	})
})

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

		const svelteScripts = getConfig(configs, 'kp/svelte/scripts')
		expect(getProjectService(svelteScripts)).toBe(false)
		expect(svelteScripts.rules?.['ts/await-thenable']).toBe('off')
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

		const svelteScripts = getConfig(configs, 'kp/svelte/scripts')
		expect(getProjectService(svelteScripts)).toBe(true)
		expect(getParserOptions(svelteScripts).tsconfigRootDir).toBe(projectDirectory)
		expect(getConfig(configs, 'kp/svelte/disable-type-aware-by-language').files).toEqual([
			'**/*.svelte.js',
		])

		const astroRules = getConfig(configs, 'kp/astro/rules')
		expect(getParserOptions(astroRules).project).toBe(true)
		expect(getParserOptions(astroRules).tsconfigRootDir).toBe(projectDirectory)
	})
})
