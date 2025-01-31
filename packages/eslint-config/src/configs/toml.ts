import type { OptionsOverrides, TypedFlatConfigItem } from '../types'

import { GLOB_TOML } from '../globs'
import { tomlRecommendedRules } from '../presets'
import { interopDefault } from '../utils'

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
