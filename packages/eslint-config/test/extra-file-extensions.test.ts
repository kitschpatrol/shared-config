import type { Linter } from 'eslint'
import { ESLint } from 'eslint'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { OptionsConfig } from '../src/types.js'
import { eslintConfig } from '../src/index.js'

let tempDirectory: string

type ParserOptions = {
	extraFileExtensions?: unknown
}

const scriptFiles = [
	'script.ts',
	'script.mts',
	'script.cts',
	'script.tsx',
	'script.js',
	'script.mjs',
	'script.cjs',
	'script.jsx',
	'script.test.ts',
	'state.svelte.ts',
	'state.svelte.js',
]

beforeAll(async () => {
	tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'eslint-config-extensions-test-'))
	// Enable type-aware linting so the project service settings are in play
	await fs.writeFile(
		path.join(tempDirectory, 'tsconfig.json'),
		'{"compilerOptions":{"strict":true},"include":["**/*"]}\n',
	)
})

afterAll(async () => {
	await fs.rm(tempDirectory, { force: true, recursive: true })
})

async function createEslint(options: OptionsConfig): Promise<ESLint> {
	const configs = await eslintConfig({
		gitignore: false,
		isInEditor: false,
		react: false,
		tsconfigRootDirectory: tempDirectory,
		...options,
	})

	return new ESLint({
		baseConfig: [...configs],
		cwd: tempDirectory,
		overrideConfigFile: true,
	})
}

async function getExtraFileExtensions(eslint: ESLint, fileName: string): Promise<unknown> {
	// ESLint currently types this API's result as `any`.
	// eslint-disable-next-line ts/no-unsafe-assignment
	const config: Linter.Config | undefined = await eslint.calculateConfigForFile(
		path.join(tempDirectory, fileName),
	)
	const parserOptions = config?.languageOptions?.parserOptions as ParserOptions | undefined

	return parserOptions?.extraFileExtensions
}

describe('extra file extensions', () => {
	it.each([
		['Svelte', { astro: false, svelte: true }, ['Component.svelte'], ['.svelte']],
		['Astro', { astro: true, svelte: false }, ['Component.astro'], ['.astro']],
		[
			'Astro and Svelte',
			{ astro: true, svelte: true },
			['Component.astro', 'Component.svelte'],
			['.astro', '.svelte'],
		],
	] as const)(
		'uses one value for every script and %s component so the project service never reloads',
		async (_, options, componentFiles, expected) => {
			const eslint = await createEslint(options)
			const fileNames = [...scriptFiles, ...componentFiles]
			const extensionsByFile = Object.fromEntries(
				await Promise.all(
					fileNames.map(async (fileName): Promise<[string, unknown]> => [
						fileName,
						await getExtraFileExtensions(eslint, fileName),
					]),
				),
			)

			expect(extensionsByFile).toEqual(
				Object.fromEntries(fileNames.map((fileName) => [fileName, expected])),
			)
		},
	)

	it('leaves the option unset when no framework is enabled', async () => {
		const eslint = await createEslint({ astro: false, svelte: false })

		expect(await getExtraFileExtensions(eslint, 'script.ts')).toBeUndefined()
	})
})
