import type {
	OptionsOverrides,
	OptionsTsconfigRootDirectory,
	OptionsTypeAware,
	TypedFlatConfigItem,
} from '../types'
import { getLanguageOptions } from '../config'
import { GLOB_JS } from '../globs'
import { sharedScriptConfig, sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

/**
 * JavaScript configuration, note use of TypeScript rules
 */
export async function js(
	options: OptionsOverrides & OptionsTsconfigRootDirectory & OptionsTypeAware = {},
): Promise<TypedFlatConfigItem[]> {
	const { overrides = {}, tsconfigRootDirectory } = options
	const { enabled = true, ignores = [] } = options.typeAware ?? {}

	return [
		{
			// Includes plugins...
			...sharedScriptConfig,
			files: [GLOB_JS],
			languageOptions: getLanguageOptions(enabled, false, tsconfigRootDirectory),
			name: 'kp/js/rules',
			rules: {
				...sharedScriptConfig.rules,
				'jsdoc/check-tag-names': 'off',
				'jsdoc/no-types': 'off',
				...(!enabled && sharedScriptDisableTypeCheckedRules),
				...overrides,
			},
		},
		{
			files: ['**/*.cjs'],
			name: 'kp/js/cjs',
			rules: {
				'ts/no-require-imports': 'off',
			},
		},
		enabled && ignores.length > 0
			? {
					files: ignores,
					languageOptions: getLanguageOptions(false, false, tsconfigRootDirectory),
					name: 'kp/js/disable-type-aware',
					rules: {
						...sharedScriptDisableTypeCheckedRules,
					},
				}
			: {},
	]
}
