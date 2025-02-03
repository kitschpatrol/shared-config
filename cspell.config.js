import { cspellConfig } from '@kitschpatrol/cspell-config'

export default cspellConfig({
	ignorePaths: [
		'/packages/*/init/*.json',
		'/packages/*/bin',
		'/test/fixtures/input',
		'/test/fixtures/output-fixable',
		// TODO reenable this...
		'/test/fixtures/output-fixed',
	],
	words: ['asdfasdfasdf'],
})
