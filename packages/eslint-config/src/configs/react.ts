import type {
	OptionsOverrides,
	OptionsTsconfigRootDirectory,
	OptionsTypeAware,
	TypedFlatConfigItem,
} from '../types'
// Wat?
import {
	GLOB_ASTRO_TS,
	GLOB_JS,
	GLOB_JSX,
	GLOB_MARKDOWN,
	GLOB_MDX,
	GLOB_SRC,
	GLOB_TS,
	GLOB_TSX,
} from '../globs'
import { reactDisableTypeCheckedRules, reactRecommendedTypeCheckedRules } from '../presets'
import { interopDefault } from '../utilities'

// eslint-react is preferred over eslint-plugin-react?

export async function react(
	options: OptionsOverrides &
		OptionsTsconfigRootDirectory &
		OptionsTypeAware & { typeAwareJavaScript?: boolean } = {},
): Promise<TypedFlatConfigItem[]> {
	const { overrides = {} } = options
	const { enabled = true, ignores = [] } = options.typeAware ?? {}
	const typeAwareJavaScript = options.typeAwareJavaScript ?? enabled

	const files = [GLOB_SRC, `${GLOB_MARKDOWN}/**`, `${GLOB_MDX}/**`, GLOB_ASTRO_TS]
	const ignoresTypeAware = [`${GLOB_MARKDOWN}/**`, `${GLOB_MDX}/**`, GLOB_ASTRO_TS, ...ignores]
	const filesWithoutTypeInformation = [
		...(typeAwareJavaScript ? [] : [GLOB_JS, GLOB_JSX]),
		...(enabled ? [] : [GLOB_TS, GLOB_TSX]),
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
				...(!enabled && !typeAwareJavaScript && reactDisableTypeCheckedRules),
				...overrides,
			},
		},
		filesWithoutTypeInformation.length > 0
			? {
					files: filesWithoutTypeInformation,
					name: 'kp/react/disable-type-aware-by-language',
					rules: {
						...reactDisableTypeCheckedRules,
					},
				}
			: {},
		enabled || typeAwareJavaScript
			? {
					files: ignoresTypeAware,
					name: 'kp/react/disable-type-aware',
					rules: {
						...reactDisableTypeCheckedRules,
					},
				}
			: {},
	]
}
