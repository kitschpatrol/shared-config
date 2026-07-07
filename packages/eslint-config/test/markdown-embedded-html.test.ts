import type { Linter } from 'eslint'
import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { eslintConfig } from '../src/index.js'

async function lint(source: string, filePath: string): Promise<Linter.LintMessage[]> {
	// FlatConfigComposer is thenable — awaiting it resolves to the flat config array
	const configs = await eslintConfig({ isInEditor: false })
	const eslint = new ESLint({
		baseConfig: [...configs],
		// Prevent ESLint from loading the project's eslint.config.ts on top of ours
		overrideConfigFile: true,
	})
	const [result] = await eslint.lintText(source, { filePath })
	return result.messages
}

const documentSkeleton = [
	'<html>',
	'  <head></head>',
	'  <body>',
	'    <p>Hello</p>',
	'  </body>',
	'</html>',
].join('\n')

function fence(code: string): string {
	return `# Example\n\n\`\`\`html\n${code}\n\`\`\`\n`
}

describe('embedded html code blocks in markdown', () => {
	it('should not report anything on a well-formed fragment', async () => {
		const messages = await lint(fence('<div class="demo">\n  <p>Hello</p>\n</div>'), 'readme.md')
		expect(messages).toEqual([])
	})

	it('should still report fragment-level problems', async () => {
		const messages = await lint(fence('<div id="a" id="a"></div>'), 'readme.md')
		expect(messages.map((message) => message.ruleId)).toContain('html/no-duplicate-attrs')
	})

	it('should not report document-level rules on a document skeleton in markdown', async () => {
		const messages = await lint(fence(documentSkeleton), 'readme.md')
		expect(messages.filter((message) => message.ruleId?.startsWith('html/'))).toEqual([])
	})

	it('should not report document-level rules on a document skeleton in mdx', async () => {
		const messages = await lint(fence(documentSkeleton), 'readme.mdx')
		expect(messages.filter((message) => message.ruleId?.startsWith('html/'))).toEqual([])
	})

	it('should still report document-level rules in actual html files', async () => {
		const messages = await lint(documentSkeleton, 'file.html')
		const ruleIds = messages.map((message) => message.ruleId)
		expect(ruleIds).toContain('html/require-doctype')
		expect(ruleIds).toContain('html/require-lang')
	})
})
