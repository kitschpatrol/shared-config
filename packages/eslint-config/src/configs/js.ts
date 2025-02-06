import type { OptionsOverrides, OptionsTypeAware, TypedFlatConfigItem } from '../types'
import { getLanguageOptions } from '../factory'
import { GLOB_JS } from '../globs'
import { sharedScriptConfig, sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

/**
 * JavaScript configuration, note use of TypeScript rules
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
			// Includes plugins...
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
