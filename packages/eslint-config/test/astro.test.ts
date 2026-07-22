import { ESLint } from 'eslint'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { OptionsConfig } from '../src/types.js'
import { eslintConfig } from '../src/index.js'

let tempDirectory: string

const componentSource = [
	'---',
	"const title: string = 'Hello'",
	'---',
	'',
	'<html lang="en">',
	'  <head>',
	'    <title>{title}</title>',
	'  </head>',
	'  <body>',
	'    <button type="button">{title}</button>',
	'    <script>',
	"      document.querySelector('button')?.addEventListener('click', () => {",
	"        console.log('clicked')",
	'      })',
	'    </script>',
	'    <script>',
	'      const count: number = 1',
	'      console.log(count)',
	'    </script>',
	'  </body>',
	'</html>',
].join('\n')

beforeAll(async () => {
	tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'eslint-config-astro-test-'))
})

afterAll(async () => {
	await fs.rm(tempDirectory, { force: true, recursive: true })
})

async function createEslint(
	tsconfigRootDirectory: string,
	options: OptionsConfig = {},
): Promise<ESLint> {
	const configs = await eslintConfig({
		astro: true,
		gitignore: false,
		isInEditor: false,
		react: false,
		svelte: false,
		tsconfigRootDirectory,
		...options,
	})

	return new ESLint({
		baseConfig: [...configs],
		cwd: tsconfigRootDirectory,
		overrideConfigFile: true,
	})
}

async function lint(eslint: ESLint, source: string, filePath: string): Promise<ESLint.LintResult> {
	const [result] = await eslint.lintText(source, { filePath })
	if (result === undefined) {
		throw new Error(`ESLint returned no results for "${filePath}"`)
	}

	return result
}

describe('Astro parsing', () => {
	it.each([
		['without a tsconfig', false],
		['with a tsconfig', true],
	] as const)('parses components and client scripts %s', async (_, typeAware) => {
		const projectDirectory = path.join(tempDirectory, typeAware ? 'typed' : 'untyped')
		await fs.mkdir(projectDirectory)
		if (typeAware) {
			await fs.writeFile(
				path.join(projectDirectory, 'tsconfig.json'),
				'{"compilerOptions":{"strict":true},"include":["**/*"]}\n',
			)
		}

		const filePath = path.join(projectDirectory, 'Example.astro')
		await fs.writeFile(filePath, componentSource)
		const eslint = await createEslint(projectDirectory)
		const result = await lint(eslint, componentSource, filePath)

		expect(result.fatalErrorCount).toBe(0)
		expect(result.messages.filter((message) => message.fatal === true)).toEqual([])
	})

	it('applies embedded overrides to TypeScript virtual files with browser globals', async () => {
		const projectDirectory = path.join(tempDirectory, 'overrides')
		await fs.mkdir(projectDirectory)
		const eslint = await createEslint(projectDirectory, {
			astro: {
				overridesEmbeddedScripts: {
					'no-undef': 'error',
				},
				typeAware: { enabled: false },
			},
		})
		const source = [
			'---',
			'---',
			'<script>',
			"  document.querySelector('button')",
			'  externalValue()',
			'</script>',
		].join('\n')
		const result = await lint(eslint, source, path.join(projectDirectory, 'Override.astro'))
		const noUndefinedMessages = result.messages.filter((message) => message.ruleId === 'no-undef')

		expect(noUndefinedMessages).toHaveLength(1)
		expect(noUndefinedMessages[0]?.message).toContain('externalValue')
	})
})
