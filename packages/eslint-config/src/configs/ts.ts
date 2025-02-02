import type { OptionsOverrides, OptionsTypeAware, TypedFlatConfigItem } from '../types'
import { getLanguageOptions } from '../factory'
import { GLOB_TS } from '../globs'
import { xoTypescriptDtsRules } from '../presets'
import { sharedScriptConfig, sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

export async function ts(
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
			...sharedScriptConfig,
			files: [GLOB_TS],
			languageOptions: getLanguageOptions(typeAware.enabled, false),
			name: 'kp/ts/rules',
			rules: {
				...sharedScriptConfig.rules,
				...(typeAware.enabled ? {} : sharedScriptDisableTypeCheckedRules),
				'jsdoc/require-param': 'off',
				'jsdoc/require-returns': 'off',
				...overrides,
			},
		},
		{
			files: ['**/*.d.?([cm])ts'],
			name: 'kp/ts/dts',
			rules: {
				...xoTypescriptDtsRules,
			},
		},
		typeAware.enabled && typeAware.ignores.length > 0
			? {
					files: typeAware.ignores,
					languageOptions: getLanguageOptions(false, false),
					name: 'kp/ts/disable-type-aware',
					rules: {
						...sharedScriptDisableTypeCheckedRules,
					},
				}
			: {},
	]
}
