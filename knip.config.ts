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
		'case-police',
		'prettier-plugin-astro',
		'prettier-plugin-svelte',
		'stylelint-config-html',
		'stylelint-config-standard',
		'@types/react',
		'@types/eslint-config-prettier',
		'eslint-config-prettier',
		'eslint-config-xo-typescript',
	],
})
