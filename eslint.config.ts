import { eslintConfig } from '@kitschpatrol/eslint-config'

export default eslintConfig(
	{
		astro: true,
		ignores: [
			// Packages compile their CLIs to committed, minified bin/cli.js files
			'**/bin/',
			'packages/eslint-config/src/typegen.d.ts',
			'test/fixtures/input/*',
			'test/fixtures/output-fixed-auto/*',
		],
		react: true,
		svelte: {
			overrides: {
				// Test exercises StyleLint's matching of a postcss style block
				'svelte/block-lang': [
					'error',
					{
						enforceScriptPresent: false,
						enforceStylePresent: false,
						script: 'ts', // A list of languages or null to signify no language specified
						// eslint-disable-next-line unicorn/no-null
						style: [null, 'postcss'],
					},
				],
			},
		},
		ts: {
			overrides: {
				'depend/ban-dependencies': [
					'error',
					{
						allowed: ['fs-extra', 'execa', 'package-up', 'dot-prop'],
					},
				],
				// Quick testbed
				// 'perfectionist/sort-objects': [
				// 	'error',
				// 	generatePerfectionistSortConfig(['width', 'height']),
				// 	{ newlinesBetween: 0, order: 'asc', type: 'natural' },
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
			'unicorn/name-replacements': 'off',
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
	{
		files: ['test/fixtures/output-fixed-manual/*'],
		rules: {
			// Fixture files deliberately mix exports with top-level calls
			'unicorn/no-top-level-side-effects': 'off',
			// Using these to force ES Modules...
			'unicorn/require-module-specifiers': 'off',
		},
	},
)
