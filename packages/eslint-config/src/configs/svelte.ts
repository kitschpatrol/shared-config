import type { OptionsOverrides, Rules, TypedFlatConfigItem } from '../types'

import { GLOB_SVELTE } from '../globs'
import { tsParser } from '../parsers'
import { interopDefault } from '../utils'

/* eslint-disable ts/naming-convention */

const svelteRecommendedrules: Rules = {
	// Begin expansion 'eslint-plugin-svelte' 'recommended'
	'svelte/comment-directive': 'error',
	'svelte/no-at-debug-tags': 'warn',
	'svelte/no-at-html-tags': 'error',
	'svelte/no-dupe-else-if-blocks': 'error',
	'svelte/no-dupe-style-properties': 'error',
	'svelte/no-dynamic-slot-name': 'error',
	'svelte/no-inner-declarations': 'error',
	'svelte/no-not-function-handler': 'error',
	'svelte/no-object-in-text-mustaches': 'error',
	'svelte/no-shorthand-style-property-overrides': 'error',
	'svelte/no-unknown-style-directive-property': 'error',
	'svelte/no-unused-svelte-ignore': 'error',
	'svelte/system': 'error',
	'svelte/valid-compile': 'error',
	// End expansion
}

/* eslint-enable ts/naming-convention */

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
				...svelteRecommendedrules,
				// TODO revisit

				...overrides,
			},
		},
	]
}
