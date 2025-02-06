import { cspellConfig } from '@kitschpatrol/cspell-config'

export default cspellConfig({
	ignorePaths: [
		'/packages/*/init/*.json',
		'/packages/*/bin',
		'/test/fixtures/input',
		'/test/fixtures/output-fixed-auto',
	],
	words: ['bullrich', 'hyperse', 'kbrashears', 'neostandard', 'softprops', 'Zumer'],
})
