import type {
	OptionsOverrides,
	OptionsTsconfigRootDirectory,
	OptionsTypeAware,
	TypedFlatConfigItem,
} from '../types'
import { getLanguageOptions } from '../config'
import { GLOB_JSX } from '../globs'
import { sharedScriptDisableTypeCheckedRules } from './shared-js-ts'
import { sharedJsxTsxConfig } from './shared-jsx-tsx'

export async function jsx(
	options: OptionsOverrides & OptionsTsconfigRootDirectory & OptionsTypeAware = {},
): Promise<TypedFlatConfigItem[]> {
	const { overrides = {}, tsconfigRootDirectory } = options
	const { enabled = true, ignores = [] } = options.typeAware ?? {}

	return [
		{
			...sharedJsxTsxConfig,
			files: [GLOB_JSX],
			languageOptions: getLanguageOptions(enabled, true, tsconfigRootDirectory),
			name: 'kp/jsx/rules',
			rules: {
				...sharedJsxTsxConfig.rules,
				...(!enabled && sharedScriptDisableTypeCheckedRules),
				...overrides,
			},
		},
		enabled && ignores.length > 0
			? {
					files: ignores,
					languageOptions: getLanguageOptions(false, true, tsconfigRootDirectory),
					name: 'kp/jsx/disable-type-aware',
					rules: {
						...sharedScriptDisableTypeCheckedRules,
					},
				}
			: {},
	]
}
