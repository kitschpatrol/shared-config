import { eslintConfig } from '@kitschpatrol/eslint-config'

export default eslintConfig({
	astro: true,
	react: true,
	svelte: true,
	type: 'lib',
})

// TODO ignore
// bin/
// /test/fixtures/input
// /test/fixtures/output-fixable
