import type { OptionsOverrides, OptionsTypeAware, TypedFlatConfigItem } from '../types'
import { getLanguageOptions } from '../factory'
import { GLOB_JSX } from '../globs'
import { sharedScriptDisableTypeCheckedRules } from './shared-js-ts'
import { sharedJsxTsxConfig } from './shared-jsx-tsx'

export async function jsx(
	options: OptionsOverrides & OptionsTypeAware = {},
): Promise<TypedFlatConfigItem[]> {
	const {
		overrides = {},
		typeAware = {
			enabled: true,
			ignores: [],
		},
	} = options

	return [
		{
			...sharedJsxTsxConfig,
			files: [GLOB_JSX],
			languageOptions: getLanguageOptions(typeAware.enabled, true),
			name: 'kp/jsx/rules',
			rules: {
				...sharedJsxTsxConfig.rules,
				...(typeAware.enabled ? {} : sharedScriptDisableTypeCheckedRules),
				...overrides,
			},
		},
		typeAware.enabled && typeAware.ignores.length > 0
			? {
					files: typeAware.ignores,
					languageOptions: getLanguageOptions(false, true),
					name: 'kp/jsx/disable-type-aware',
					rules: {
						...sharedScriptDisableTypeCheckedRules,
					},
				}
			: {},
	]
}
