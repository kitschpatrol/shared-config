import { knipConfig } from '@kitschpatrol/knip-config'

export default knipConfig({
	ignore: [
		'**/init/**',
		'test/fixtures/**',
		'**/test/fixtures/**',
		'packages/eslint-config/src/presets/**',
	],
	ignoreBinaries: ['ksdiff', 'pbcopy'],
	ignoreDependencies: [
		'@kitschpatrol/prettier-plugin-astro',
		'@types/eslint-config-prettier',
		'@types/react',
		'case-police',
		'eslint-config-prettier',
		'eslint-config-xo-typescript',
		'prettier-plugin-svelte',
		'remark-attribute-list',
		'remark-directive',
		'stylelint-config-html',
		'stylelint-config-standard',
	],
})
