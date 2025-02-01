import type { Rules, TypedFlatConfigItem } from '../types'
import { prettierRules } from '../presets/prettier'

/**
 * Final configuration pass to disable specific rules in specific contexts.
 */
export async function disables(): Promise<TypedFlatConfigItem[]> {
	return [
		// TODO move this logic to js / typescript?
		// {
		//   files: [`**/scripts/${GLOB_SRC}`],
		//   name: 'kp/disables/scripts',
		//   languageOptions: {
		//     globals: globals.nodeBuiltin,
		//   },
		//   rules: {
		//     'node/hashbang': 'error',
		//   },
		// },
		// {
		//   files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
		//   languageOptions: {
		//     globals: globals.nodeBuiltin,
		//   },
		//   name: 'kp/disables/cli',
		//   rules: {
		//     'no-console': 'off',
		//   },
		// },
		// {
		//   files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
		//   name: 'kp/disables/bin',
		//   rules: {
		//   },
		// },
		{
			files: ['**/*.d.?([cm])ts'],
			name: 'kp/disables/dts',
			rules: {
				'eslint-comments/no-unlimited-disable': 'off',
				'import/no-duplicates': 'off',
				'no-restricted-syntax': 'off',
			},
		},
		{
			files: ['**/*.cjs'],
			name: 'kp/disables/cjs',
			rules: {
				'ts/no-require-imports': 'off',
			},
		},
		// {
		//   files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
		//   name: 'kp/disables/config-files',
		//   rules: {
		//     'no-console': 'off',
		//     'ts/explicit-function-return-type': 'off',
		//   },
		// },
		{
			name: 'kp/disables/prettier',
			rules: {
				...(prettierRules as Rules),
			},
		},
	]
}
