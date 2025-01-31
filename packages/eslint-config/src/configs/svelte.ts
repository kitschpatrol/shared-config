import type { OptionsOverrides, TypedFlatConfigItem } from '../types'

import { GLOB_SVELTE } from '../globs'
import { tsParser } from '../parsers'
import { svelteRecommendedRules } from '../presets'
import { interopDefault } from '../utils'

/**
 *
 * @param options
 */
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
			// ...sharedScriptConfig,
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
				// TODO revisit

				...overrides,
			},
		},
	]
}
