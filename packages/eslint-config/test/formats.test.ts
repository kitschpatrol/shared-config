import type { Linter } from 'eslint'
import { ESLint } from 'eslint'
import { flat as mdxFlat } from 'eslint-plugin-mdx'
import { format } from 'prettier'
import { describe, expect, it } from 'vitest'
import type { OptionsConfig } from '../src/types.js'
import { eslintConfig } from '../src/index.js'

const markdownParser = mdxFlat.languageOptions?.parser as {
	parseForESLint(source: string, options: Record<string, unknown>): Linter.ESLintParseResult
}

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

describe('remark fixes', () => {
	it.each(['example.md', 'example.mdx'])(
		'preserves unrelated list formatting when reporting a heading warning in %s',
		async (filePath) => {
			const eslint = await createEslint({}, true)
			const source = '# Example\n\n*   Keep this list spacing.\n\n# Another heading\n'
			const result = await lint(eslint, source, filePath)

			expect(result.fatalErrorCount).toBe(0)
			expect(result.messages.map((message) => message.ruleId)).toContain(
				'remark-lint-no-multiple-toplevel-headings',
			)
			expect(result.output ?? source).toBe(source)
		},
	)
})

describe.each(['example.md', 'example.mdx'])('%s list fixes', (filePath) => {
	it.each(['+', '*', '-'])(
		'keeps a %s list together when fixing a reference in its middle item',
		async (marker) => {
			const source = `# Example\n\n${marker} First\n ${marker} with a [link] (/to/somewhere)\n${marker} Third\n`
			const eslint = await createEslint({}, true)
			const result = await lint(eslint, source, filePath)
			expect(result.messages).toEqual([])
			const fixed = result.output ?? source
			const formatted = await format(fixed, { filepath: filePath })

			for (const text of [fixed, formatted]) {
				// This Markdown-only sample also parses as MDX, whose AST exposes list nodes.
				const { ast } = markdownParser.parseForESLint(text, {
					filePath: 'structure.mdx',
					ignoreRemarkConfig: true,
				})
				const lists = ast.body.filter((node: { type: string }) => node.type === 'MDList')
				expect(lists).toMatchObject([
					{
						children: [{ type: 'MDListItem' }, { type: 'MDListItem' }, { type: 'MDListItem' }],
					},
				])
			}

			const secondPass = await lint(eslint, formatted, filePath)
			expect(secondPass.messages).toEqual([])
			expect(secondPass.output).toBeUndefined()
		},
	)
})

describe('Markdown headings', () => {
	it.each(['example.md', 'example.mdx'])(
		'reports and converts Setext headings to ATX in %s',
		async (filePath) => {
			const source = 'Title\n=====\n\nSection\n-------\n'
			const eslint = await createEslint()
			const result = await lint(eslint, source, filePath)

			expect(result.fatalErrorCount).toBe(0)
			expect(result.messages.map((message) => message.ruleId)).toEqual([
				'remark-lint-heading-style',
				'remark-lint-heading-style',
			])

			const eslintWithFixes = await createEslint({}, true)
			const fixed = await lint(eslintWithFixes, source, filePath)
			expect(fixed.messages).toEqual([])
			expect(fixed.output).toBe('# Title\n\n## Section\n')

			const secondPass = await lint(eslintWithFixes, fixed.output ?? source, filePath)
			expect(secondPass.messages).toEqual([])
			expect(secondPass.output).toBeUndefined()
		},
	)
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
