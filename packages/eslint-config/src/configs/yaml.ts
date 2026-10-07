import type { OptionsOverrides, TypedFlatConfigItem } from '../types'
import { GLOB_YAML } from '../globs'
import { yamlRecommendedRules } from '../presets'
import { interopDefault } from '../utilities'

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
			files: ['**/pnpm-workspace.yaml'],
			name: 'kp/yaml/rules-pnpm-workspace',
			rules: {
				'yaml/sort-keys': ['error', 'asc', { caseSensitive: false }],
				'yaml/sort-sequence-values': [
					'error',
					{
						order: { caseSensitive: false, type: 'asc' },
						// Alphabetize list values only in the fields listed below.
						// Exclude hoistPattern and publicHoistPattern because reordering negated
						// patterns can change which packages are hoisted. Exclude pnpmfile
						// because its list order determines hook execution order.
						pathPattern: `^(${[
							'gitShallowHosts',
							'ignoredBuiltDependencies',
							'minimumReleaseAgeExclude',
							'neverBuiltDependencies',
							'onlyBuiltDependencies',
							'packages',
							'requiredScripts',
							String.raw`supportedArchitectures(?:\.(?:cpu|libc|os))?`,
							'syncInjectedDepsAfterScripts',
							'trustPolicyExclude',
						].join('|')})$`,
					},
				],
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
