import type {
	OptionsOverrides,
	OptionsTsconfigRootDirectory,
	OptionsTypeAware,
	TypedFlatConfigItem,
} from '../types'
import { getLanguageOptions } from '../config'
import { GLOB_TS } from '../globs'
import { xoTypescriptDtsRules } from '../presets'
import { sharedScriptConfig, sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

export async function ts(
	options: OptionsOverrides & OptionsTsconfigRootDirectory & OptionsTypeAware = {},
): Promise<TypedFlatConfigItem[]> {
	const { overrides = {}, tsconfigRootDirectory } = options
	const { enabled = true, ignores = [] } = options.typeAware ?? {}

	return [
		{
			...sharedScriptConfig,
			files: [GLOB_TS],
			languageOptions: getLanguageOptions(enabled, false, tsconfigRootDirectory),
			name: 'kp/ts/rules',
			rules: {
				...sharedScriptConfig.rules,
				...(!enabled && sharedScriptDisableTypeCheckedRules),
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
		enabled && ignores.length > 0
			? {
					files: ignores,
					languageOptions: getLanguageOptions(false, false, tsconfigRootDirectory),
					name: 'kp/ts/disable-type-aware',
					rules: {
						...sharedScriptDisableTypeCheckedRules,
					},
				}
			: {},
	]
}
