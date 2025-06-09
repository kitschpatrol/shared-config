import { cspellConfig } from '@kitschpatrol/cspell-config'

export default cspellConfig({
	ignorePaths: [
		'./packages/*/init/*.json',
		'./packages/*/bin',
		'./test/fixtures/input',
		'./test/fixtures/output-fixed-auto',
		'./packages/eslint-config/src/typegen.d.ts',
	],
	words: ['bullrich', 'hyperse', 'softprops'],
})
