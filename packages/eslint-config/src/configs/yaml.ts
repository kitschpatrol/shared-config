import type { OptionsOverrides, Rules, TypedFlatConfigItem } from '../types'

import { GLOB_YAML } from '../globs'
import { interopDefault } from '../utils'

const ymlRecommendedRules: Rules = {
	// Begin expansion 'eslint-plugin-yml' 'flat/recommended[2]'
	'yaml/no-empty-document': 'error',
	'yaml/no-empty-key': 'error',
	'yaml/no-empty-mapping-value': 'error',
	'yaml/no-empty-sequence-entry': 'error',
	'yaml/no-irregular-whitespace': 'error',
	'yaml/no-tab-indent': 'error',
	'yaml/vue-custom-block/no-parsing-error': 'error',
	// End expansion
}

/**
 *
 */
export async function yaml(options: OptionsOverrides = {}): Promise<TypedFlatConfigItem[]> {
	const { overrides = {} } = options

	const files = [GLOB_YAML]

	const [pluginYaml, parserYaml] = await Promise.all([
		interopDefault(import('eslint-plugin-yml')),
		interopDefault(import('yaml-eslint-parser')),
	] as const)

	return [
		{
			name: 'kp/yaml/setup',
			plugins: {
				yaml: pluginYaml,
			},
		},
		{
			files,
			languageOptions: {
				parser: parserYaml,
			},
			name: 'kp/yaml/rules',
			rules: {
				...ymlRecommendedRules,
				...overrides,
			},
		},
	]
}
