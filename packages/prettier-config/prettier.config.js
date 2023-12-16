import { homedir } from 'node:os'

/** @type {import("prettier").Config} */
const config = {
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
				rubyExecutablePath: `${homedir}/.rbenv/shims/ruby`,
			},
		},
		{
			files: ['*rc', '*ignore'],
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
		'prettier-plugin-pkg',
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

export default config
