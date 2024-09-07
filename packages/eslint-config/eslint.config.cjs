/* eslint-disable unicorn/no-null */
/* eslint-disable perfectionist/sort-objects */
const extendsPrefix = [
	'eslint:recommended',
	'plugin:n/recommended',
	'plugin:unicorn/recommended',
	'xo',
	'plugin:perfectionist/recommended-natural-legacy',
	'prettier', // Needed here as well for files not caught by overrides
]
const extendsTypescript = ['plugin:@typescript-eslint/recommended-type-checked', 'xo-typescript']
const extendsSuffix = ['prettier']

const globalRulesPrefix = {
	'max-params': 'off',
	'n/no-missing-import': 'off', // Trouble resolving in ts
	'n/no-process-exit': 'off', // Duplicated in unicorn
	'n/no-extraneous-import': 'off', // Monorepo problems
	'n/no-unpublished-import': 'off', // Monorepo problems
	'no-await-in-loop': 'off',
	'object-curly-spacing': 'off', // Shouldn't prettier get rid of this?
	'comma-dangle': 'off', // Shouldn't prettier get rid of this?
	'no-unused-vars': [
		'error',
		{
			argsIgnorePattern: '^_',
			destructuredArrayIgnorePattern: '^_',
		},
	],
	'no-warning-comments': 'off',
	'perfectionist/sort-imports': [
		'error',
		{
			// Is this already set in the preset?
			type: 'natural',
			newlinesBetween: 'never',
		},
	],
	'unicorn/no-array-reduce': 'off',
	'unicorn/prevent-abbreviations': [
		'error',
		{
			replacements: {
				acc: false,
				arg: false,
				args: false,
				db: false,
				dev: false,
				doc: false,
				docs: false,
				env: false,
				fn: false,
				i: false,
				j: false,
				lib: false,
				param: false,
				params: false,
				pkg: false,
				prop: false,
				props: false,
				ref: false,
				refs: false,
				src: false,
				temp: false,
			},
		},
	],
	// Perfectionist conflict rules,
	'@typescript-eslint/adjacent-overload-signatures': 'off',
	'@typescript-eslint/sort-type-constituents': 'off',
	'import/order': 'off',
	'react/jsx-sort-props': 'off',
	'sort-imports': 'off',
}

const globalRulesTypescript = {
	'@typescript-eslint/no-unused-vars': [
		'error',
		{
			argsIgnorePattern: '^_',
			destructuredArrayIgnorePattern: '^_',
		},
	],
	'default-case': 'off', // TS checks
	'no-throw-literal': 'off', // Conflicts with @typescript-eslint version https://typescript-eslint.io/rules/no-throw-literal/#how-to-use
	// https://typescript-eslint.io/linting/troubleshooting/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
	'no-undef': 'off',
	'no-unused-vars': 'off',
	'@typescript-eslint/naming-convention': [
		// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md
		'error',
		// Group selectors
		{
			// Matches everything
			selector: 'default',
			format: ['camelCase'],
		},
		{
			// Forgive quoted things
			selector: 'default',
			format: null,
			modifiers: ['requiresQuotes'],
		},
		{
			// Matches the same as class, enum, interface, typeAlias, typeParameter
			selector: 'typeLike',
			format: ['StrictPascalCase'],
		},
		{
			// Matches the same as function, parameter and variable
			selector: 'variableLike',
			leadingUnderscore: 'allow',
			trailingUnderscore: 'allow',
			format: ['camelCase'],
		},
		// {
		// 	// matches the same as accessor, enumMember, method, parameterProperty, property
		// 	selector: 'memberLike'
		// 	// format: []
		// },
		// {
		// 	// matches the same as classMethod, objectLiteralMethod, typeMethod
		// 	selector: 'method'
		// 	// format: []
		// },
		// {
		// 	// matches the same as classProperty, objectLiteralProperty, typeProperty
		// 	selector: 'property'
		// 	// format: []
		// },
		// Individual selectors
		{
			selector: 'import',
			format: ['camelCase', 'StrictPascalCase'],
		},
		{
			// Allow Component import
			selector: 'variable',
			modifiers: ['destructured'],
			format: ['camelCase', 'StrictPascalCase'],
		},
		{
			// Allow UPPER_CASE const exports
			selector: 'variable',
			modifiers: ['const', 'exported'],
			format: ['UPPER_CASE'],
		},
	],
}

/* @type {import('eslint').Linter.Config} */
module.exports = {
	plugins: ['@html-eslint', 'html'],
	extends: extendsPrefix,
	env: {
		browser: true,
		es2022: true, // TODO 2024 like xo?
		node: true,
	},
	parser: '@typescript-eslint/parser', // Todo right choice for jsdoc js?
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2022,
		extraFileExtensions: ['.svelte', '.astro'], // Essential for these file types to make it to the override
		project: 'tsconfig.eslint.json',
		tsconfigRootDir: process.cwd(), // Look for tsconfig in the consuming project's root
		sourceType: 'module',
	},
	rules: globalRulesPrefix,
	overrides: [
		// HTML (and inline scripts)
		{
			files: ['*.html'],
			parser: '@html-eslint/parser',
			rules: {
				// Best Practice
				'@html-eslint/no-duplicate-attrs': 'error',
				'@html-eslint/no-duplicate-id': 'error',
				'@html-eslint/no-inline-styles': 'error',
				'@html-eslint/no-obsolete-tags': 'error',
				'@html-eslint/no-restricted-attr-values': 'error',
				'@html-eslint/no-restricted-attrs': 'error',
				'@html-eslint/no-script-style-type': 'error',
				'@html-eslint/no-target-blank': 'error',
				'@html-eslint/require-attrs': 'error',
				'@html-eslint/require-button-type': 'error',
				// '@html-eslint/require-closing-tags': 'error',
				'@html-eslint/require-doctype': 'error',
				'@html-eslint/require-li-container': 'error',
				'@html-eslint/require-meta-charset': 'error',
				// SEO
				'@html-eslint/no-multiple-h1': 'error',
				'@html-eslint/require-lang': 'error',
				// '@html-eslint/require-meta-description': 'error',
				// '@html-eslint/require-open-graph-protocol': 'error',
				'@html-eslint/require-title': 'error',
				// Accessibility
				'@html-eslint/no-abstract-roles': 'error',
				'@html-eslint/no-accesskey-attrs': 'error',
				'@html-eslint/no-aria-hidden-body': 'error',
				'@html-eslint/no-non-scalable-viewport': 'error',
				'@html-eslint/no-positive-tabindex': 'error',
				'@html-eslint/no-skip-heading-levels': 'error',
				'@html-eslint/require-frame-title': 'error',
				'@html-eslint/require-img-alt': 'error',
				'@html-eslint/require-meta-viewport': 'error',
			},
		},

		// Markdown
		{
			extends: ['plugin:mdx/recommended'],
			files: ['*.md'],
			parser: 'eslint-mdx',
			rules: globalRulesPrefix,
		},
		// MDX
		{
			extends: ['plugin:mdx/recommended', ...extendsSuffix],
			files: ['*.mdx'],
			parser: 'eslint-mdx',
			rules: {
				...globalRulesPrefix,
				'no-unused-expressions': 'off',
				'no-unused-vars': 'off',

				// MDX files can be PascalCase OR kebab-case, depending on whether
				// the file's core nature is that of content or component
				'unicorn/filename-case': [
					'error',
					{
						cases: {
							kebabCase: true,
							pascalCase: true,
						},
					},
				],
			},
			settings: {
				'mdx/code-blocks': false,
			},
		},
		// TypeScript
		{
			extends: [...extendsTypescript, ...extendsSuffix],
			files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
			// SvelteKit
			overrides: [
				{
					files: ['**/routes/**/+*.ts'],
					rules: {
						// Error often imported from from '@sveltejs/kit in SvelteKit files
						'@typescript-eslint/no-throw-literal': 'off',
					},
				},
			],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: 'tsconfig.eslint.json', // Not sure why this isn't inherited
			},
			rules: {
				...globalRulesPrefix,
				...globalRulesTypescript,
			},
		},
		// JavaScript
		{
			extends: [...extendsSuffix],
			files: ['*.jsx', '*.mjs', '*.cjs', '.js'],
			rules: {
				...globalRulesPrefix,
				...globalRulesTypescript,
			},
		},
		// Astro
		{
			extends: [
				...extendsTypescript,
				'plugin:astro/recommended',
				'plugin:astro/jsx-a11y-recommended',
				...extendsSuffix,
			],
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				extraFileExtensions: ['.astro'],
				parser: '@typescript-eslint/parser',
				project: 'tsconfig.eslint.json', // Not sure why this isn't inherited
				sourceType: 'module',
			},
			rules: {
				...globalRulesPrefix,
				...globalRulesTypescript,
				'@typescript-eslint/no-unsafe-assignment': 'off', // Crashing
				'@typescript-eslint/no-unsafe-return': 'off', // Happens in templates
				// Astro components are usually PascalCase,
				// but when used as pages they are kebab-case
				'unicorn/filename-case': [
					'error',
					{
						cases: {
							kebabCase: true,
							pascalCase: true,
						},
						ignore: [String.raw`^\[slug\]\.astro$`],
					},
				],
			},
		},
		// Svelte
		{
			extends: [
				...extendsTypescript,
				'plugin:svelte/recommended',
				...extendsSuffix,
				'plugin:svelte/prettier',
			],
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				extraFileExtensions: ['.svelte'],
				parser: '@typescript-eslint/parser',
				project: true,
				sourceType: 'module',
			},
			rules: {
				...globalRulesPrefix,
				...globalRulesTypescript,
				'@typescript-eslint/no-confusing-void-expression': 'off', // Reactive statements
				'@typescript-eslint/no-unused-expressions': 'off', // Needed for reactive statements
				'import/no-mutable-exports': 'off', // Allow prop export
				'no-sequences': 'off', // Reactive statements
				// https://github.com/typescript-eslint/typescript-eslint/blob/1cf9243/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
				'no-undef-init': 'off', // Initialize props to undefined
				'prefer-const': 'off', // Needed for let props
				'unicorn/filename-case': [
					// Svelte components are PascalCase
					'error',
					{
						case: 'pascalCase',
						ignore: [
							String.raw`^\+`, // SvelteKit +page.svelte etc.
						],
					},
				],
				'unicorn/no-useless-undefined': 'off', // Needed for let props
			},
		},
	],
}
