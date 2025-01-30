import type { OptionsOverrides, OptionsTypeAware, TypedFlatConfigItem } from '../types'

import { getLanguageOptions } from '../factory'
import { GLOB_TS } from '../globs'
import { sharedScriptConfig, sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

/**
 * Typescript configuration
 * @param options
 */
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
