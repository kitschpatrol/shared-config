import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { eslintConfig } from '../src/index.js'

async function createEslint(react = false): Promise<ESLint> {
	const configs = await eslintConfig({
		astro: false,
		gitignore: false,
		isInEditor: false,
		js: { typeAware: { enabled: false } },
		jsx: { typeAware: { enabled: false } },
		react: react ? { typeAware: { enabled: false } } : false,
		svelte: false,
		ts: { typeAware: { enabled: false } },
		tsx: { typeAware: { enabled: false } },
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

describe('unused imports', () => {
	it.each([
		['JavaScript', 'unused.js', "import { readFile } from 'node:fs/promises'", 'readFile'],
		['TypeScript', 'unused.ts', "import type { Stats } from 'node:fs'", 'Stats'],
	])(
		'reports unused %s imports with the shared TypeScript rule',
		async (_, filePath, source, name) => {
			const eslint = await createEslint()
			const result = await lint(eslint, `${source}\nexport const value = 1`, filePath)
			const messages = result.messages.filter((message) => message.ruleId === 'ts/no-unused-vars')

			expect(messages).toHaveLength(1)
			expect(messages[0]?.message).toContain(`'${name}'`)
		},
	)

	it.each([
		['JSX', 'view.jsx'],
		['TSX', 'view.tsx'],
	])(
		'recognizes used JSX imports and reports unused ones with React enabled in %s',
		async (_, filePath) => {
			const eslint = await createEslint(true)
			const source = [
				"import { describe as Used, expect as Unused } from 'vitest'",
				'export const View = () => <Used />',
			].join('\n')
			const result = await lint(eslint, source, filePath)
			const messages = result.messages.filter((message) => message.ruleId === 'ts/no-unused-vars')

			expect(messages).toHaveLength(1)
			expect(messages[0]?.message).toContain("'Unused'")
		},
	)
})

describe('capitalized comments', () => {
	it.each([
		'await task',
		'class Example {}',
		'coverage-ignore next',
		'for (const item of items) {}',
		'function helper() {}',
		'prettier-ignore',
		'v8 ignore next',
	])('accepts the shared XO and local exception for "%s"', async (comment) => {
		const eslint = await createEslint()
		const result = await lint(eslint, `// ${comment}\nexport const value = 1`, 'comment.js')

		expect(result.messages.map((message) => message.ruleId)).not.toContain('capitalized-comments')
	})

	it('still rejects lowercase prose', async () => {
		const eslint = await createEslint()
		const result = await lint(
			eslint,
			'// this explanatory sentence should be capitalized\nexport const value = 1',
			'comment.js',
		)

		expect(result.messages.map((message) => message.ruleId)).toContain('capitalized-comments')
	})
})
