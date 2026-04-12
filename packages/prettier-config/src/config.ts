import type { Config as BasePrettierConfig } from 'prettier'
import type { Options as PrettierPluginJsdocOptions } from 'prettier-plugin-jsdoc'
import { deepmerge } from 'deepmerge-ts'
import { homedir } from 'node:os'
import { sortOrder as sortPackageJsonSortOrder } from 'sort-package-json'

export type PrettierConfig = BasePrettierConfig & PrettierPluginJsdocOptions

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
	// Additional prettier-plugin-jsdoc options
	// Note: these trigger "Ignored unknown option" warnings from prettier CLI
	// because the plugin registers its options after config validation.
	// Warnings are filtered out in command.ts via outputFilter.
	jsdocCommentLineStrategy: 'keep',
	jsdocPreferCodeFences: true,
	jsdocPrintWidth: 80,
	jsdocSeparateReturnsFromParam: true,
	overrides: [
		{
			files: ['*.md', '*.mdx', '*.yml'],
			options: {
				useTabs: false,
			},
		},
		{
			files: '*.astro',
			options: {
				parser: 'astro',
				plugins: ['@kitschpatrol/prettier-plugin-astro'],
			},
		},
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
				plugins: ['prettier-plugin-svelte'],
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
				plugins: ['prettier-plugin-sh'],
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
		// TODO Disabled in favor of jsdoc pending https://github.com/hosseinmd/prettier-plugin-jsdoc/pull/255
		// 'prettier-plugin-tailwindcss',
		'prettier-plugin-toml',
		// Disabled because it is huge
		// 'prettier-plugin-sql',
		'prettier-plugin-jsdoc',
	],
	printWidth: 100,
	semi: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
}

/**
 * **@Kitschpatrol's Shared Prettier Configuration**
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
