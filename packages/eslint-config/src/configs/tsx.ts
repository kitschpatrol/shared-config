import type {
	OptionsOverrides,
	OptionsTsconfigRootDirectory,
	OptionsTypeAware,
	TypedFlatConfigItem,
} from '../types'
import { getLanguageOptions } from '../config'
import { GLOB_TSX } from '../globs'
import { sharedScriptDisableTypeCheckedRules } from './shared-js-ts'
import { sharedJsxTsxConfig } from './shared-jsx-tsx'

export async function tsx(
	options: OptionsOverrides & OptionsTsconfigRootDirectory & OptionsTypeAware = {},
): Promise<TypedFlatConfigItem[]> {
	const { overrides = {}, tsconfigRootDirectory } = options
	const { enabled = true, ignores = [] } = options.typeAware ?? {}

	return [
		{
			...sharedJsxTsxConfig,
			files: [GLOB_TSX],
			languageOptions: getLanguageOptions(enabled, true, tsconfigRootDirectory),
			name: 'kp/tsx/rules',
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
					name: 'kp/tsx/disable-type-aware',
					rules: {
						...sharedScriptDisableTypeCheckedRules,
					},
				}
			: {},
	]
}
