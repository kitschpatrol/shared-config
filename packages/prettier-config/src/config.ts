import type { Config as BasePrettierConfig } from 'prettier'
import type { Options as PrettierPluginJsdocOptions } from 'prettier-plugin-jsdoc'
import type { PluginOptions as PrettierPluginTailwindOptions } from 'prettier-plugin-tailwindcss'
import { deepmerge } from 'deepmerge-ts'
import { homedir } from 'node:os'
import { sortOrder as sortPackageJsonSortOrder } from 'sort-package-json'

export type PrettierConfig = BasePrettierConfig &
	PrettierPluginJsdocOptions &
	PrettierPluginTailwindOptions

/**
 * Merge custom keys into the `sort-package-json` `order` array. Where
 * duplicated, delete existing and prioritize new keys.
 */
function customizeSortOrder(keys: string[], newKeys: string[]): string[] {
	// If new keys are in keys, remove them
	const filteredKeys = keys.filter((key) => !newKeys.includes(key))

	// Append new keys to the end
	return [...filteredKeys, ...newKeys]
}

export const sharedPrettierConfig: PrettierConfig = {
	bracketSpacing: true,
	endOfLine: 'lf',
	jsdocCommentLineStrategy: 'keep',
	jsdocPreferCodeFences: true,
	jsdocPrintWidth: 80,
	jsdocSeparateReturnsFromParam: true,
	overrides: [
		{
			files: ['*.markdown', '*.md', '*.mdx', '*.yml', '*.yaml'],
			options: {
				useTabs: false,
			},
		},
		{
			files: '*.astro',
			options: {
				parser: 'astro',
				// Override plugin arrays replace the top-level list. Keep parser plugins
				// first, JSDoc next, and Tailwind last so their transforms compose.
				plugins: [
					'prettier-plugin-astro',
					'prettier-plugin-jsdoc',
					// MUST come last
					'prettier-plugin-tailwindcss',
				],
			},
		},
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
				plugins: [
					'prettier-plugin-svelte',
					'prettier-plugin-jsdoc',
					// MUST come last
					'prettier-plugin-tailwindcss',
				],
			},
		},
		{
			files: '*.rb',
			options: {
				rubyExecutablePath: `${homedir()}/.rbenv/shims/ruby`,
			},
		},
		{
			files: ['*rc', '*ignore', '*.sh', '*.zsh', '*.bash', '*.fish'],
			options: {
				parser: 'sh',
				plugins: ['prettier-plugin-sh', 'prettier-plugin-jsdoc'],
			},
		},
		// Make this match eslint 'json-package/order-properties'
		// https://github.com/matzkoh/prettier-plugin-packagejson/issues/188
		// This must stay in sync with packages/eslint-config/src/configs/json.ts
		{
			files: 'package.json',
			options: {
				packageSortOrder: customizeSortOrder(sortPackageJsonSortOrder, [
					'cspell',
					'knip',
					'mdat',
					'prettier',
					'remarkConfig',
					'stylelint',
				]),
			},
		},
	],
	plugins: [
		'@prettier/plugin-php',
		'@prettier/plugin-ruby',
		'@prettier/plugin-xml',
		'prettier-plugin-packagejson',
		'prettier-plugin-sh',
		'prettier-plugin-toml',
		// Disabled because it is huge
		// 'prettier-plugin-sql',
		'prettier-plugin-jsdoc',
		// Must load last to compose with other plugins, including prettier-plugin-jsdoc
		'prettier-plugin-tailwindcss',
	],
	printWidth: 100,
	semi: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
}

/**
 * **@Kitschpatrol's Shared [Prettier](https://prettier.io/) Configuration**
 *
 * @example
 * 	export default prettierConfig({
 * 		printWidth: 120,
 * 	})
 *
 * @see [@kitschpatrol/prettier-config](https://github.com/kitschpatrol/shared-config/tree/main/packages/prettier-config)
 * @see [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config)
 */
export function prettierConfig(config?: PrettierConfig): PrettierConfig {
	return deepmerge(sharedPrettierConfig, config)
}
