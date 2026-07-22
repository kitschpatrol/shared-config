import {
	checkTextDocument,
	createTextDocument,
	finalizeSettings,
	IncludeExcludeFlag,
} from 'cspell-lib'
import { describe, expect, it } from 'vitest'
import { sharedCspellConfig } from '../src/config.js'

const markdownSettings = sharedCspellConfig.languageSettings?.find(({ languageId }) =>
	typeof languageId === 'string' ? languageId.split(',').includes('markdown') : false,
)
const markdownIgnorePatterns = markdownSettings?.ignoreRegExpList ?? []

async function getIncludedText(text: string): Promise<string> {
	const document = createTextDocument({
		content: text,
		languageId: 'markdown',
		uri: 'untitled:code-fence-test.md',
	})
	const { items } = await checkTextDocument(
		document,
		{ noConfigSearch: true },
		{
			ignoreRegExpList: markdownIgnorePatterns,
			loadDefaultConfiguration: false,
		},
	)
	return items
		.filter(({ flagIE }) => flagIE === IncludeExcludeFlag.INCLUDE)
		.map(({ text: includedText }) => includedText)
		.join('')
}

describe('Markdown code-fence ignore pattern', () => {
	it('relies on CSpell to add the required global flag', () => {
		const { ignoreRegExpList } = finalizeSettings({
			ignoreRegExpList: markdownIgnorePatterns,
		})

		expect(markdownIgnorePatterns[0]).toBe('/^```[\\s\\S]+?^```/m')
		expect(ignoreRegExpList[0]?.global).toBe(true)
	})

	it('excludes one fenced block while retaining surrounding prose', async () => {
		const includedText = await getIncludedText(
			['Before prose.', '```ts', 'fenced content', '```', 'After prose.'].join('\n'),
		)

		expect(includedText).toContain('Before prose.')
		expect(includedText).toContain('After prose.')
		expect(includedText).not.toContain('fenced content')
	})

	it('excludes every fenced block when a document contains multiple blocks', async () => {
		const includedText = await getIncludedText(
			[
				'Before prose.',
				'```ts',
				'first fenced content',
				'```',
				'Between prose.',
				'```json',
				'second fenced content',
				'```',
				'After prose.',
			].join('\n'),
		)

		expect(includedText).toContain('Before prose.')
		expect(includedText).toContain('Between prose.')
		expect(includedText).toContain('After prose.')
		expect(includedText).not.toContain('first fenced content')
		expect(includedText).not.toContain('second fenced content')
	})
})
