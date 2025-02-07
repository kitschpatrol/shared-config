import { eslintConfig } from '@kitschpatrol/eslint-config'

export default eslintConfig(
	{
		astro: true,
		ignores: [
			'bin/',
			'packages/eslint-config/src/typegen.d.ts',
			'test/fixtures/input/*',
			'test/fixtures/output-fixed-auto/*',
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
	{
		// Ignore template package.json fragment files
		files: ['packages/*/init/package.json'],
		rules: {
			'json-package/require-version': 'off',
			'json-package/valid-package-definition': 'off',
		},
	},
)
