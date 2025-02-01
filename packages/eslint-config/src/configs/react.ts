import type { OptionsOverrides, OptionsTypeAware, TypedFlatConfigItem } from '../types'

// Wat?
import { GLOB_ASTRO_TS, GLOB_MARKDOWN, GLOB_MDX, GLOB_SRC } from '../globs'
import { reactDisableTypeCheckedRules, reactRecommendedTypeCheckedRules } from '../presets'
import { interopDefault } from '../utils'

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
	const { plugins } = recommendedTypescriptConfig

	return [
		{
			name: 'kp/react/setup',
			plugins: {
				react: plugins['@eslint-react'],
				'react-debug': plugins['@eslint-react/debug'],
				'react-dom': plugins['@eslint-react/dom'],
				'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
				'react-naming-convention': plugins['@eslint-react/naming-convention'],
				'react-web-api': plugins['@eslint-react/web-api'],
			},
			settings: recommendedTypescriptConfig.settings,
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
				...(typeAware.enabled ? {} : reactDisableTypeCheckedRules),
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
