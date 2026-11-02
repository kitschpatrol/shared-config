import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import type { OptionsConfig } from '../src/types.js'
import { eslintConfig } from '../src/index.js'

async function createEslint(options: OptionsConfig = {}, fix = false): Promise<ESLint> {
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
		fix,
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

describe('MDX expressions', () => {
	it('accepts content expressions and JSX comments', async () => {
		const eslint = await createEslint()
		const result = await lint(
			eslint,
			[
				"export const title = 'Example'",
				'',
				'# Example',
				'',
				'{title}',
				'',
				'Text {title}.',
				'',
				'<div>{/* Comment */}</div>',
				'',
			].join('\n'),
			'example.mdx',
		)

		expect(result.fatalErrorCount).toBe(0)
		expect(result.messages).toEqual([])
	})

	it('still reports unused expressions inside exported JavaScript', async () => {
		const eslint = await createEslint()
		const result = await lint(
			eslint,
			'export function example() {\n  value\n}\n\n# Example\n',
			'example.mdx',
		)

		expect(result.fatalErrorCount).toBe(0)
		expect(result.messages.map((message) => message.ruleId)).toContain('no-unused-expressions')
	})
})

describe.each(['example.md', 'example.mdx'])('%s remark warnings', (filePath) => {
	it.each([
		{
			ruleId: 'remark-lint-no-multiple-toplevel-headings',
			source: '# Example\n\n*   Keep this list spacing.\n\n# Another heading\n',
		},
		{
			ruleId: 'remark-lint-no-undefined-references',
			source: '# Example\n\n* First\n * with a [link] (/to/somewhere)\n* Third\n',
		},
		{
			ruleId: 'remark-lint-no-undefined-references',
			source: '# Example\n\nSome *emphasis*[link] (/to/somewhere).\n',
		},
		{
			ruleId: 'remark-lint-no-undefined-references',
			source: '# Example\n\nLine\u{2028}separator before a [link] (/to/somewhere).\n',
		},
		{
			ruleId: 'remark-lint-heading-style',
			source: '# Example\n\n> Quoted\n> -------\n',
		},
		{
			ruleId: 'remark-lint-heading-style',
			source: '# Example\n\nTwo\nlines\n-----\n',
		},
		{
			ruleId: 'remark-lint-heading-style',
			source: '# Example\n\nTrailing #\n----------\n',
		},
	])('reports $ruleId without changing the source', async ({ ruleId, source }) => {
		const eslint = await createEslint({}, true)
		const result = await lint(eslint, source, filePath)

		expect(result.fatalErrorCount).toBe(0)
		expect(result.messages.map((message) => message.ruleId)).toContain(ruleId)
		expect(result.output).toBeUndefined()
	})

	it.each([
		{
			fixed: '# Title\n\n## Section\n',
			name: 'top-level headings',
			source: 'Title\n=====\n\nSection\n-------\n',
		},
		{
			fixed: '# Example\n\n* First\n* ## Title\n* Third\n',
			name: 'a heading in a list item',
			source: '# Example\n\n* First\n* Title\n  -----\n* Third\n',
		},
		{
			fixed: '# Example\n\nLine\u{2028}separator.\n\n## Title *emphasis*\n',
			name: 'a heading after a line separator',
			source: '# Example\n\nLine\u{2028}separator.\n\nTitle *emphasis*\n----------------\n',
		},
	])('converts $name from Setext to ATX', async ({ fixed, source }) => {
		const eslint = await createEslint({}, true)
		const result = await lint(eslint, source, filePath)

		expect(result.messages).toEqual([])
		expect(result.output).toBe(fixed)
	})
})

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
