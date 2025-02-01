import type { OptionsOverrides, TypedFlatConfigItem } from '../types'
import { GLOB_YAML } from '../globs'
import { yamlRecommendedRules } from '../presets'
import { interopDefault } from '../utils'

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
				...yamlRecommendedRules,
				...overrides,
			},
		},
	]
}
