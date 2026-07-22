import type { Linter } from 'eslint'
import { ESLint } from 'eslint'
import { beforeAll, describe, expect, it } from 'vitest'
import { eslintConfig } from '../src/index.js'

let eslint: ESLint

beforeAll(async () => {
	const configs = await eslintConfig({
		astro: false,
		gitignore: false,
		isInEditor: false,
		js: { typeAware: { enabled: false } },
		jsx: { typeAware: { enabled: false } },
		react: false,
		svelte: { typeAware: { enabled: false } },
		ts: { typeAware: { enabled: false } },
		tsx: { typeAware: { enabled: false } },
	})
	eslint = new ESLint({
		baseConfig: [...configs],
		overrideConfigFile: true,
	})
})

async function lint(source: string, filePath: string): Promise<ESLint.LintResult> {
	const [result] = await eslint.lintText(source, { filePath })
	if (result === undefined) {
		throw new Error(`ESLint returned no results for "${filePath}"`)
	}

	return result
}

function expectNoFatalErrors(result: ESLint.LintResult): void {
	expect(result.fatalErrorCount).toBe(0)
	expect(result.messages.filter((message) => message.fatal === true)).toEqual([])
}

describe('Svelte parsing', () => {
	it('parses a TypeScript component through the component processor', async () => {
		const result = await lint(
			[
				'<script lang="ts">',
				'  let count: number = 0',
				'</script>',
				'',
				'<button type="button" onclick={() => count += 1}>{count}</button>',
			].join('\n'),
			'test/fixtures/Counter.svelte',
		)

		expectNoFatalErrors(result)
	})

	it('parses JavaScript components and enforces the configured script language', async () => {
		const result = await lint(
			'<script>\n  const name = "world"\n</script>\n\n<p>Hello {name}</p>\n',
			'test/fixtures/Greeting.svelte',
		)

		expectNoFatalErrors(result)
		expect(result.messages.map((message) => message.ruleId)).toContain('svelte/block-lang')
	})

	it('parses JavaScript and TypeScript Svelte modules without the component processor', async () => {
		const [javaScriptResult, typeScriptResult] = await Promise.all([
			lint('export const count = 0\n', 'test/fixtures/state.svelte.js'),
			lint('export const count: number = 0\n', 'test/fixtures/state.svelte.ts'),
		])

		expectNoFatalErrors(javaScriptResult)
		expectNoFatalErrors(typeScriptResult)
	})

	it('applies the SvelteKit route exception to the effective TypeScript config', async () => {
		// ESLint currently types this API's result as `any`.
		// eslint-disable-next-line ts/no-unsafe-assignment
		const config: Linter.Config | undefined = await eslint.calculateConfigForFile(
			'src/routes/example/+page.ts',
		)

		expect(config?.rules?.['ts/no-throw-literal']).toEqual([0])
	})
})
