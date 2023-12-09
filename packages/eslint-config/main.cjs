/* eslint-disable @typescript-eslint/naming-convention */
/* @type {import('eslint').Linter.Config} */
module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:astro/recommended',
		'plugin:astro/jsx-a11y-recommended',
		'plugin:svelte/recommended',
		'plugin:unicorn/recommended',
		'plugin:n/recommended',
		'xo',
		'xo-typescript',
		'plugin:perfectionist/recommended-natural',
		'prettier',
	],
	overrides: [
		{
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				extraFileExtensions: ['.astro'],
				parser: '@typescript-eslint/parser',
			},
			rules: {
				'no-unused-vars': [
					'error',
					{
						argsIgnorePattern: '^_',
						destructuredArrayIgnorePattern: '^_',
					},
				],
				'unicorn/filename-case': 'off',
			},
		},
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
			rules: {
				// https://github.com/nuxt/eslint-config/issues/140
				'@typescript-eslint/ban-types': 'off',
				// https://github.com/typescript-eslint/typescript-eslint/blob/1cf9243/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
				'no-undef': 'off',
				'unicorn/filename-case': 'off',
			},
		},
	],
	rules: {
		// Possible perfectionist conflicts
		'@typescript-eslint/adjacent-overload-signatures': 'off',
		'@typescript-eslint/sort-type-constituents': 'off',
		'import/order': 'off',
		'n/no-process-exit': 'off', // Duplicated in unicorn
		'no-await-in-loop': 'off',
		'perfectionist/sort-imports': [
			'error',
			{
				'newlines-between': 'never',
			},
		],
		'react/jsx-sort-props': 'off',
		'sort-imports': 'off',
		'unicorn/no-array-reduce': 'off',
		'unicorn/prevent-abbreviations': [
			'error',
			{
				allowList: {
					Props: true,
					acc: true,
					args: true,
					props: true,
				},
			},
		],
	},
};
