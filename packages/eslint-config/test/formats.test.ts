import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import type { OptionsConfig } from '../src/types.js'
import { eslintConfig } from '../src/index.js'

async function createEslint(options: OptionsConfig = {}): Promise<ESLint> {
	const configs = await eslintConfig({
		astro: false,
		gitignore: false,
		isInEditor: false,
		js: { typeAware: { enabled: false } },
		jsx: { typeAware: { enabled: false } },
		react: false,
		svelte: false,
		ts: { typeAware: { enabled: false } },
		tsx: { typeAware: { enabled: false } },
		...options,
	})

	return new ESLint({
		baseConfig: [...configs],
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

describe('HTML ownership', () => {
	it('lints markup but not literal script bodies in tagged templates', async () => {
		const eslint = await createEslint({
			html: { overridesEmbeddedScripts: { 'no-undef': 'error' } },
		})
		const source = [
			'export const markup = html`',
			'  <script>missingInLiteral()</script>',
			'  <div id="same" id="same"></div>',
			'`',
		].join('\n')
		const result = await lint(eslint, source, 'template.ts')
		const ruleIds = result.messages.map((message) => message.ruleId)

		expect(ruleIds).toContain('html/no-duplicate-attrs')
		expect(ruleIds).not.toContain('no-undef')
	})

	it('applies embedded script overrides to physical HTML files', async () => {
		const eslint = await createEslint({
			html: { overridesEmbeddedScripts: { 'no-undef': 'error' } },
		})
		const source = [
			'<!doctype html>',
			'<html lang="en">',
			'<head>',
			'<meta charset="utf-8">',
			'<meta content="width=device-width" name="viewport">',
			'<title>Example</title>',
			'</head>',
			'<body><script>externalValue()</script></body>',
			'</html>',
		].join('\n')
		const result = await lint(eslint, source, 'file.html')

		expect(result.messages.map((message) => message.ruleId)).toContain('no-undef')
	})
})

describe('JSON languages', () => {
	it.each([
		['JSON', 'file.json', '{"key": 1, "key": 2}'],
		['JSONC', 'file.jsonc', '{/* comment */ "key": 1, "key": 2}'],
		['JSON5', 'file.json5', '{key: 1, key: 2}'],
	])('parses %s with the shared JSONC language', async (_, filePath, source) => {
		const eslint = await createEslint()
		const result = await lint(eslint, source, filePath)

		expect(result.fatalErrorCount).toBe(0)
		expect(result.messages.map((message) => message.ruleId)).toContain('json/no-dupe-keys')
	})

	it('runs package rules on the shared JSON language', async () => {
		const eslint = await createEslint()
		const result = await lint(
			eslint,
			'{"name":"example","version":"1.0.0","description":"Example","license":"MIT"}',
			'example/package.json',
		)
		const ruleIds = result.messages.map((message) => message.ruleId)

		expect(result.fatalErrorCount).toBe(0)
		expect(ruleIds).toContain('json-package/require-author')
		expect(ruleIds).toContain('json-package/require-keywords')
	})
})

describe('test globals', () => {
	it('recognizes Vitest globals while preserving no-undef for unknown names', async () => {
		const eslint = await createEslint({
			test: {
				overrides: {
					'no-undef': 'error',
					'test/valid-title': 'off',
				},
			},
		})
		const source = [
			"describe('suite', () => {",
			'  beforeAll(() => vi.clearAllMocks())',
			"  it('works', () => {",
			'    expect(true).toBe(true)',
			'    onTestFinished(() => vi.clearAllMocks())',
			'    missingTestGlobal()',
			'  })',
			'})',
		].join('\n')
		const result = await lint(eslint, source, 'test/example.test.ts')
		const noUndefinedMessages = result.messages.filter((message) => message.ruleId === 'no-undef')

		expect(noUndefinedMessages).toHaveLength(1)
		expect(noUndefinedMessages[0]?.message).toContain('missingTestGlobal')
	})
})
