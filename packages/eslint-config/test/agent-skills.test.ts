import { ESLint } from 'eslint'
import { beforeAll, describe, expect, it } from 'vitest'
import { eslintConfig } from '../src/index.js'

let eslint: ESLint

beforeAll(async () => {
	const configs = await eslintConfig({
		astro: false,
		gitignore: false,
		isInEditor: false,
		react: false,
		svelte: false,
	})

	eslint = new ESLint({
		baseConfig: [...configs],
		overrideConfigFile: true,
	})
})

const skill = `---
name: example
description: Example skill.
---

# Example

\`\`\`ts
import { something } from './src/missing-in-this-project'

console.log(something)
\`\`\`
`

async function lintRuleIds(filePath: string): Promise<string[]> {
	const [result] = await eslint.lintText(skill, { filePath })
	if (result === undefined) {
		throw new Error(`ESLint returned no results for "${filePath}"`)
	}

	expect(result.fatalErrorCount).toBe(0)
	return result.messages.map((message) => message.ruleId ?? 'fatal')
}

describe('Agent Skills', () => {
	it.each(['skills/example/SKILL.md', 'packages/example/skills/example/SKILL.md'])(
		'accepts the specified file name and unresolvable example imports in %s',
		async (filePath) => {
			expect(await lintRuleIds(filePath)).toEqual([])
		},
	)

	it('accepts unresolvable example imports in skill reference documents', async () => {
		expect(await lintRuleIds('skills/example/references/usage.md')).toEqual([])
	})

	it('still enforces file name case for other Markdown files in a skill', async () => {
		expect(await lintRuleIds('skills/example/references/USAGE.md')).toEqual([
			'unicorn/filename-case',
		])
	})

	it('still enforces file name case and import resolution outside of skills', async () => {
		const ruleIds = await lintRuleIds('docs/SKILL.md')
		expect(ruleIds).toContain('unicorn/filename-case')
		expect(ruleIds).toContain('import/no-unresolved')
	})
})
