import { knipConfig } from '@kitschpatrol/knip-config'

export default knipConfig({
	ignore: ['**/init/**', 'test/fixtures/**'],
	ignoreBinaries: ['ksdiff', 'pbcopy'],
	ignoreDependencies: [
		'@kitschpatrol/repo-config', // Technically not needed?
		'@kitschpatrol/typescript-config', // Technically not needed?
		'@prettier/plugin-php',
		'@prettier/plugin-ruby',
		'@prettier/plugin-xml',
		'@types/eslint-config-prettier',
		'@types/react',
		'case-police',
		'cspell-lib',
		'cspell',
		'eslint-config-prettier',
		'eslint-config-xo-typescript',
		'globby',
		'mdat',
		'picocolors',
		'prettier-plugin-astro',
		'prettier-plugin-packagejson',
		'prettier-plugin-sh',
		'prettier-plugin-sql',
		'prettier-plugin-svelte',
		'prettier-plugin-tailwindcss',
		'prettier-plugin-toml',
		'stylelint-config-html',
		'stylelint-config-standard',
		'stylelint',
	],
})
