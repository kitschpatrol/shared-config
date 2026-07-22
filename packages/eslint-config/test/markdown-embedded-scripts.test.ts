import { ESLint } from 'eslint'
import { beforeAll, describe, expect, it } from 'vitest'
import type { OptionsConfig } from '../src/types.js'
import { eslintConfig } from '../src/index.js'

let eslint: ESLint

async function createEslint(options: OptionsConfig = {}): Promise<ESLint> {
	const configs = await eslintConfig({
		astro: false,
		gitignore: false,
		isInEditor: false,
		react: false,
		svelte: false,
		...options,
	})

	return new ESLint({
		baseConfig: [...configs],
		overrideConfigFile: true,
	})
}

beforeAll(async () => {
	eslint = await createEslint()
})

function fence(language: string, code: string): string {
	return `# Example\n\n\`\`\`${language}\n${code}\n\`\`\`\n`
}

async function lint(
	eslintInstance: ESLint,
	source: string,
	filePath: string,
): Promise<ESLint.LintResult> {
	const [result] = await eslintInstance.lintText(source, { filePath })
	if (result === undefined) {
		throw new Error(`ESLint returned no results for "${filePath}"`)
	}

	return result
}

describe.each([
	['Markdown', 'readme.md'],
	['MDX', 'readme.mdx'],
])('%s embedded scripts', (_, filePath) => {
	it('parses JavaScript and TypeScript virtual files without project services', async () => {
		const results = await Promise.all([
			lint(eslint, fence('js', 'externalValue()'), filePath),
			lint(eslint, fence('ts', 'const value: string = externalValue'), filePath),
			lint(eslint, fence('jsx', 'const element = <div />'), filePath),
			lint(eslint, fence('tsx', 'const element: JSX.Element = <div />'), filePath),
		])

		for (const result of results) {
			expect(result.fatalErrorCount).toBe(0)
			expect(result.messages).toEqual([])
		}
	})

	it('does not require complete JSDoc in example code', async () => {
		const result = await lint(
			eslint,
			fence(
				'ts',
				[
					'/**',
					' * Greet a user.',
					' *',
					' * @param name',
					' */',
					'export function greet(name: string) {',
					"  return 'Hello, ' + name",
					'}',
				].join('\n'),
			),
			filePath,
		)
		const ruleIds = result.messages.map((message) => message.ruleId)

		expect(ruleIds).not.toContain('jsdoc/require-param-description')
		expect(ruleIds).not.toContain('jsdoc/require-returns')
	})
})

describe('embedded script overrides', () => {
	it.each([
		['md', 'readme.md'],
		['mdx', 'readme.mdx'],
	] as const)('applies %s overrides after code-block defaults', async (configKey, filePath) => {
		const eslintWithOverride = await createEslint({
			[configKey]: {
				overridesEmbeddedScripts: {
					'no-undef': 'error',
				},
			},
		})
		const result = await lint(eslintWithOverride, fence('js', 'externalValue()'), filePath)

		expect(result.messages.map((message) => message.ruleId)).toContain('no-undef')
	})
})
