import type { Config as PrettierConfig } from 'prettier'
import { deepmerge } from 'deepmerge-ts'
import { homedir } from 'node:os'

const sharedPrettierConfig: PrettierConfig = {
	bracketSpacing: true,
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
				plugins: ['prettier-plugin-astro'],
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
	],
	plugins: [
		'@prettier/plugin-php',
		'@prettier/plugin-ruby',
		'@prettier/plugin-xml',
		'prettier-plugin-packagejson',
		'prettier-plugin-sh',
		'prettier-plugin-sql',
		'prettier-plugin-tailwindcss',
		'prettier-plugin-toml',
	],
	printWidth: 100,
	semi: false,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
}

/**
 * **\@Kitschpatrol's Shared Prettier Configuration**
 * @see [@kitschpatrol/prettier-config](https://github.com/kitschpatrol/shared-config/tree/main/packages/prettier-config)
 * @see [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config)
 * @example
 * ```js
 * export default prettierConfig({
 *   printWidth: 120,
 * })
 * ```
 */
export function prettierConfig(config?: PrettierConfig): PrettierConfig {
	return deepmerge(sharedPrettierConfig, config)
}

export default sharedPrettierConfig
