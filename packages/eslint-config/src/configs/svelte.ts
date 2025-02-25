import type { OptionsOverrides, TypedFlatConfigItem } from '../types'
import { GLOB_SVELTE } from '../globs'
import { tsParser } from '../parsers'
import { svelteRecommendedRules } from '../presets'
import { interopDefault } from '../utilities'
import { sharedScriptConfig } from './shared-js-ts'

export async function svelte(options: OptionsOverrides = {}): Promise<TypedFlatConfigItem[]> {
	const { overrides = {} } = options

	const files = [GLOB_SVELTE]

	const [pluginSvelte, parserSvelte] = await Promise.all([
		interopDefault(import('eslint-plugin-svelte')),
		interopDefault(import('svelte-eslint-parser')),
	] as const)

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
					extraFileExtensions: ['.svelte'],
					parser: tsParser, // TODO js version?
				},
			},
			name: 'kp/svelte/rules',
			processor: pluginSvelte.processors['.svelte'],
			rules: {
				...svelteRecommendedRules,
				'import/no-mutable-exports': 'off', // Allow prop export
				'no-sequences': 'off', // Reactive statements
				// https://github.com/typescript-eslint/typescript-eslint/blob/1cf9243/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
				'no-undef-init': 'off', // Initialize props to undefined
				'prefer-const': 'off', // Needed for let props
				// TODO revisit, what's template and what's code?
				// TOdO import shared?
				'ts/no-confusing-void-expression': 'off', // Reactive statements
				'ts/no-unused-expressions': 'off', // Needed for reactive statements
				'unicorn/filename-case': [
					// Svelte components are PascalCase
					'error',
					{
						case: 'pascalCase',
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
	]
}
