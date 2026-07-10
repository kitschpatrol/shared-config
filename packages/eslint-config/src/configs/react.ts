import type { OptionsOverrides, OptionsTypeAware, TypedFlatConfigItem } from '../types'
// Wat?
import { GLOB_ASTRO_TS, GLOB_MARKDOWN, GLOB_MDX, GLOB_SRC } from '../globs'
import { reactDisableTypeCheckedRules, reactRecommendedTypeCheckedRules } from '../presets'
import { interopDefault } from '../utilities'

// eslint-react is preferred over eslint-plugin-react?

export async function react(
	options: OptionsOverrides & OptionsTypeAware = {},
): Promise<TypedFlatConfigItem[]> {
	const {
		overrides = {},
		typeAware = {
			enabled: true,
			ignores: [],
		},
	} = options

	const files = [GLOB_SRC, `${GLOB_MARKDOWN}/**`, `${GLOB_MDX}/**`, GLOB_ASTRO_TS]
	const ignoresTypeAware = [
		`${GLOB_MARKDOWN}/**`,
		`${GLOB_MDX}/**`,
		GLOB_ASTRO_TS,
		...typeAware.ignores,
	]

	const pluginReact = await interopDefault(import('@eslint-react/eslint-plugin'))

	const recommendedTypescriptConfig = pluginReact.configs['recommended-typescript']

	return [
		{
			name: 'kp/react/setup',
			plugins: {
				react: pluginReact,
			},
			settings: recommendedTypescriptConfig.settings ?? {},
		},
		{
			files,
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						impliedStrict: true,
						jsx: true,
					},
				},
				sourceType: 'module',
			},
			name: 'kp/react/rules',
			rules: {
				...reactRecommendedTypeCheckedRules,
				...(!typeAware.enabled && reactDisableTypeCheckedRules),
				...overrides,
			},
		},
		typeAware.enabled
			? {
					files: ignoresTypeAware,
					languageOptions: {
						parserOptions: {
							ecmaFeatures: {
								impliedStrict: true,
								jsx: true,
							},
							projectService: false,
						},
					},
					name: 'kp/react/disable-type-aware',
					rules: {
						...reactDisableTypeCheckedRules,
					},
				}
			: {},
	]
}
