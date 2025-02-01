import { eslintConfig } from '@kitschpatrol/eslint-config'

export default eslintConfig(
	{
		astro: true,
		ignores: [
			'bin/',
			'test/fixtures/input/*',
			'test/fixtures/output-fixable/*',
			// TODO don't ignore this
			'test/fixtures/output-fixed/*',
		],
		react: true,
		svelte: true,
		ts: {
			overrides: {
				'depend/ban-dependencies': [
					'error',
					{
						allowed: ['fs-extra', 'execa'],
					},
				],
			},
		},
		type: 'lib',
	},
	{
		files: ['packages/eslint-config/src/presets/**.*'],
		rules: {
			'import/export': 'off', // RangeError: Maximum call stack size exceeded
			// Don't sort generated preset rules
			'perfectionist/sort-objects': 'off',
			'ts/naming-convention': 'off',
			'unicorn/no-null': 'off',
		},
	},
	{
		files: ['packages/eslint-config/src/configs/**.*'],
		rules: {
			'jsdoc/require-jsdoc': 'off',
			'ts/require-await': 'off',
			'unicorn/no-null': 'off',
		},
	},
)
