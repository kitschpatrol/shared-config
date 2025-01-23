import type { OptionsOverrides, Rules, TypedFlatConfigItem } from '../types'

import { GLOB_TOML } from '../globs'
import { interopDefault } from '../utils'

const tomlRecommendedRules: Rules = {
	// Begin expansion 'eslint-plugin-toml' 'flat/recommended[2]'
	'toml/no-unreadable-number-separator': 'error',
	'toml/precision-of-fractional-seconds': 'error',
	'toml/precision-of-integer': 'error',
	'toml/vue-custom-block/no-parsing-error': 'error',
	// End expansion
}

/**
 *
 */
export async function toml(options: OptionsOverrides = {}): Promise<TypedFlatConfigItem[]> {
	const { overrides = {} } = options

	const files = [GLOB_TOML]

	const [pluginToml, parserToml] = await Promise.all([
		interopDefault(import('eslint-plugin-toml')),
		interopDefault(import('toml-eslint-parser')),
	] as const)

	return [
		{
			name: 'kp/toml/setup',
			plugins: {
				toml: pluginToml,
			},
		},
		{
			files,
			languageOptions: {
				parser: parserToml,
			},
			name: 'kp/toml/rules',
			rules: {
				...tomlRecommendedRules,
				...overrides,
			},
		},
	]
}
