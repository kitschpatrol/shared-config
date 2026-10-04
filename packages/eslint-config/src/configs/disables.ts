import type { Rules, TypedFlatConfigItem } from '../types'
import { GLOB_CONFIG_FILES } from '../globs'
import { prettierRules } from '../presets/prettier'

/**
 * Final configuration pass to disable specific rules in specific contexts.
 */
export async function disables(): Promise<TypedFlatConfigItem[]> {
	return [
		{
			files: GLOB_CONFIG_FILES,
			name: 'kp/disables/config-files',
			rules: {
				'unicorn/no-top-level-side-effects': 'off', // `export default defineConfig(...)` is the standard config file shape
			},
		},
		{
			files: ['**/stylelint.config.js', '**/stylelint.config.ts'],
			name: 'kp/disables/stylelint-config',
			rules: {
				'unicorn/no-null': 'off',
			},
		},
		{
			name: 'kp/disables/prettier',
			rules: {
				...(prettierRules as Rules),
				// Re-enable: eslint-config-prettier disables curly, but "all" (the default) has no Prettier conflict
				curly: 'error',
			},
		},
	]
}
