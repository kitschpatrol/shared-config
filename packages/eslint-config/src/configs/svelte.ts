import path from 'node:path'
import process from 'node:process'
import type { OptionsOverrides, TypedFlatConfigItem } from '../types'
import { GLOB_SVELTE, GLOB_SVELTE_JS, GLOB_SVELTE_TS } from '../globs'
import { tsParser } from '../parsers'
import { svelteRecommendedRules } from '../presets'
import { interopDefault } from '../utilities'
import { sharedScriptConfig } from './shared-js-ts'

export async function svelte(options: OptionsOverrides = {}): Promise<TypedFlatConfigItem[]> {
	const { overrides = {} } = options

	const files = [GLOB_SVELTE, GLOB_SVELTE_JS, GLOB_SVELTE_TS]

	const [pluginSvelte, parserSvelte] = await Promise.all([
		interopDefault(import('eslint-plugin-svelte')),
		interopDefault(import('svelte-eslint-parser')),
	] as const)

	// See
	// import svelte from 'eslint-plugin-svelte'
	// console.log(svelte.configs['flat/recommended'])
	// For more...
	return [
		{
			name: 'kp/svelte/setup',
			plugins: {
				svelte: pluginSvelte,
			},
		},
		{
			// TODO inherit? Or is this just the markup part?
			...sharedScriptConfig,
			files,
			languageOptions: {
				parser: parserSvelte,
				parserOptions: {
					extraFileExtensions: ['.svelte', '.svelte.ts'],
					parser: tsParser, // TODO js version?
					projectService: true,
					svelteConfig: path.join(process.cwd(), 'svelte.config.js'),
					svelteFeatures: { experimentalGenerics: true },
					tsconfigRootDir: process.cwd(),
				},
			},
			name: 'kp/svelte/rules',
			processor: pluginSvelte.processors['.svelte'],
			rules: {
				...sharedScriptConfig.rules,
				...svelteRecommendedRules,
				'import/no-duplicates': 'off', // Doesn't detect svelte/* exports correctly
				'import/no-mutable-exports': 'off', // Allow prop export
				'no-sequences': 'off', // Reactive statements
				// https://github.com/typescript-eslint/typescript-eslint/blob/1cf9243/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
				'no-undef-init': 'off', // Initialize props to undefined
				'prefer-const': 'off', // Needed for let props
				'svelte/block-lang': [
					'error',
					{
						enforceScriptPresent: false,
						enforceStylePresent: false,
						script: 'ts', // A list of languages or null to signify no language specified
						style: undefined,
					},
				],
				'svelte/button-has-type': 'error', // Original
				// Annoying...
				// 'svelte/consistent-selector-style': [
				// 	'error',
				// 	{
				// 		checkGlobal: false,
				// 		style: ['type', 'class'],
				// 	},
				// ],
				'svelte/consistent-selector-style': 'off',
				'svelte/derived-has-same-inputs-outputs': 'error',
				'svelte/experimental-require-slot-types': 'error',
				'svelte/experimental-require-strict-events': 'error',
				'svelte/html-self-closing': 'error',
				'svelte/no-add-event-listener': 'error',
				// 'svelte/no-at-const-tags': 'error', // Type errors?
				'svelte/no-extra-reactive-curlies': 'error',
				'svelte/no-ignored-unsubscribe': 'error',
				'svelte/no-nested-style-tag': 'error',
				'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
				'svelte/no-target-blank': 'error',
				'svelte/no-trailing-spaces': 'error',
				'svelte/no-unused-class-name': 'error',
				'svelte/prefer-class-directive': 'error',
				'svelte/prefer-const': 'error',
				'svelte/prefer-derived-over-derived-by': 'error',
				'svelte/prefer-destructured-store-props': 'error',
				'svelte/prefer-style-directive': 'error',
				'svelte/require-event-prefix': 'error',
				'svelte/require-optimized-style-attribute': 'error',
				'svelte/require-store-callbacks-use-set-param': 'error',
				'svelte/require-stores-init': 'error',
				'svelte/shorthand-attribute': 'error',
				'svelte/shorthand-directive': 'error',
				'svelte/sort-attributes': 'error',
				'svelte/spaced-html-comment': 'error', // TODO get it from Prettier or eslint-html?
				'svelte/valid-compile': 'error',
				'svelte/valid-style-parse': 'error',
				// TODO revisit, what's template and what's code?
				// TOdO import shared?
				'ts/no-confusing-void-expression': 'off', // Reactive statements
				'ts/no-unused-expressions': 'off', // Needed for reactive statements
				'unicorn/filename-case': [
					// Svelte components are PascalCase
					'error',
					{
						case: 'pascalCase',
						checkDirectories: false,
						ignore: [
							String.raw`^\+`, // SvelteKit +page.svelte etc.
						],
					},
				],
				'unicorn/no-useless-undefined': 'off', // Needed for let props
				...overrides,
			},
		},
		{
			// TODO is this the right spot?
			files: ['**/routes/**/+*.ts'],
			rules: {
				// Error often imported from from '@sveltejs/kit in SvelteKit files
				'ts/no-throw-literal': 'off',
			},
		},
		{
			// SvelteKit and Vite project templates bootstrap with some deviant HTML
			files: ['src/app.html'],
			rules: {
				'html/no-inline-styles': 'off',
				'html/no-non-scalable-viewport': 'off',
				'html/require-title': 'off',
			},
		},
		{
			// Special case for \.svelte\.[jt]s$ files.
			files: [GLOB_SVELTE_JS, GLOB_SVELTE_TS],
			rules: {
				'unicorn/filename-case': [
					'error',
					{
						cases: {
							kebabCase: true,
						},
						checkDirectories: false,
					},
				],
			},
		},
	]
}
