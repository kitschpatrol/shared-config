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
		// Consumed only via marker-driven dynamic imports in the preset generation script
		'@eslint/js',
		'@kitschpatrol/prettier-plugin-astro',
		'@types/eslint-config-prettier',
		'@types/react',
		'case-police',
		'eslint-config-prettier',
		'eslint-config-xo',
		'prettier-plugin-svelte',
		'remark-attribute-list',
		'remark-directive',
		'stylelint-config-html',
		'stylelint-config-standard',
		'stylelint-plugin-defensive-css',
	],
})
