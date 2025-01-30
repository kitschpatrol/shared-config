/* eslint-disable ts/require-await */

import type { OptionsOverrides, OptionsTypeAware, TypedFlatConfigItem } from '../types'

import { getLanguageOptions } from '../factory'
import { GLOB_JS } from '../globs'
import { sharedScriptConfig, sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

/**
 * Javascript configuration, note use of TypeScript rules
 * @param options
 */
export async function js(
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
			files: [GLOB_JS],
			languageOptions: getLanguageOptions(typeAware.enabled, false),
			name: 'kp/js/rules',
			rules: {
				...sharedScriptConfig.rules,
				...(typeAware.enabled ? {} : sharedScriptDisableTypeCheckedRules),
				...overrides,
			},
		},
		typeAware.enabled && typeAware.ignores.length > 0
			? {
					files: typeAware.ignores,
					languageOptions: getLanguageOptions(false, false),
					name: 'kp/js/disable-type-aware',
					rules: {
						...sharedScriptDisableTypeCheckedRules,
					},
				}
			: {},
	]
}
