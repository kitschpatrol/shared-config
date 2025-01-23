import type { OptionsOverrides, OptionsTypeAware, TypedFlatConfigItem } from '../types'

import { getLanguageOptions } from '../factory'
import { GLOB_TSX } from '../globs'
import { sharedScriptDisableTypeCheckedRules } from './shared-js-ts'
import { sharedJsxTsxConfig } from './shared-jsx-tsx'

/**
 * Typescript configuration
 * @param options
 */
export async function tsx(
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
			files: [GLOB_TSX],
			languageOptions: getLanguageOptions(typeAware.enabled, true),
			name: 'kp/tsx/rules',
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
					name: 'kp/tsx/disable-type-aware',
					rules: {
						...sharedScriptDisableTypeCheckedRules,
					},
				}
			: {},
	]
}
