import type { Rules, TypedFlatConfigItem } from '../types'
import { prettierRules } from '../presets/prettier'

/**
 * Final configuration pass to disable specific rules in specific contexts.
 */
export async function disables(): Promise<TypedFlatConfigItem[]> {
	return [
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
