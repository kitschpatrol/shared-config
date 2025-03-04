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
				// Quick testbed
				// 'perfectionist/sort-objects': [
				// 	'error',
				// 	generatePerfectionistSortConfig(['width', 'height']),
				// 	{ newlinesBetween: 'never', order: 'asc', type: 'natural' },
				// ],
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
			'json-package/require-author': 'off',
			'json-package/require-keywords': 'off',
			'json-package/require-name': 'off',
			'json-package/require-version': 'off',
			'json-package/valid-package-definition': 'off',
		},
	},
)
