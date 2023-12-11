/* @type {import('eslint').Linter.Config} */

const extendsPrefix = [
	'eslint:recommended',
	'plugin:n/recommended',
	'plugin:unicorn/recommended',
	'xo',
	'plugin:perfectionist/recommended-natural',
];

const extendsSuffix = ['prettier'];

const rulesConfig = {
	// Possible perfectionist conflicts
	'@typescript-eslint/adjacent-overload-signatures': 'off',
	'@typescript-eslint/sort-type-constituents': 'off',
	'import/order': 'off',
	'n/no-process-exit': 'off', // Duplicated in unicorn
	'no-await-in-loop': 'off',
	'no-warning-comments': 'off',
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
};

module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: [...extendsPrefix, ...extendsSuffix],
	overrides: [
		{
			extends: [...extendsPrefix, 'plugin:@typescript-eslint/recommended', 'xo-typescript', ...extendsSuffix],
			files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
			rules: rulesConfig,
		},
		{
			extends: [...extendsPrefix, 'plugin:svelte/recommended', 'xo-typescript', ...extendsSuffix],
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				extraFileExtensions: ['.astro'],
				parser: '@typescript-eslint/parser',
			},
			rules: {
				...rulesConfig,
				'no-unused-vars': [
					'error',
					{
						argsIgnorePattern: '^_',
						destructuredArrayIgnorePattern: '^_',
					},
				],
				// Todo enforce capitalization?
				'unicorn/filename-case': 'off',
			},
		},
		{
			extends: [
				...extendsPrefix,
				'plugin:astro/recommended',
				'plugin:astro/jsx-a11y-recommended',
				'plugin:@typescript-eslint/recommended',
				'xo-typescript',
				...extendsSuffix,
			],
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
			rules: {
				...rulesConfig,
				// https://github.com/nuxt/eslint-config/issues/140
				'@typescript-eslint/ban-types': 'off',
				// https://github.com/typescript-eslint/typescript-eslint/blob/1cf9243/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
				'no-undef': 'off',
				// Todo enforce capitalization?
				'unicorn/filename-case': 'off',
			},
		},
	],
	rules: rulesConfig,
};
