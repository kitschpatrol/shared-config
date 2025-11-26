import pluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import pluginTs from '@typescript-eslint/eslint-plugin'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import pluginDeMorgan from 'eslint-plugin-de-morgan'
import * as pluginDepend from 'eslint-plugin-depend'
import pluginImport from 'eslint-plugin-import-x'
import pluginJsdocComments from 'eslint-plugin-jsdoc'
import pluginNode from 'eslint-plugin-n'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import * as pluginRegexp from 'eslint-plugin-regexp'
import pluginUnicorn from 'eslint-plugin-unicorn'
import type { Rules, TypedFlatConfigItem } from '../types'
import {
	deMorganRecommendedRules,
	dependRecommendedRules,
	eslintCommentsRecommendedRules,
	eslintJavascriptRecommendedRules,
	eslintTypescriptDisableTypeCheckedRules,
	eslintTypescriptRecommendedOverridesRules,
	eslintTypescriptStrictTypeCheckedRules,
	eslintTypescriptStylisticTypeCheckedRules,
	importRecommendedRules,
	importTypescriptRules,
	jsdocCommentsRecommendedTypescriptFlavorRules,
	jsdocCommentsRecommendedTypescriptRules,
	nodeRecommendedRules,
	perfectionistRecommendedNaturalRules,
	regexpRecommendedRules,
	unicornRecommendedRules,
	xoJavascriptRules,
	xoTypescriptRules,
} from '../presets'
import { generatePerfectionistSortConfig } from '../utilities'

// ---------

/**
 * Recommended rules from the readme, but no preset config is exported from the
 * plugin. Using built-in approach instead pending
 * https://github.com/sweepline/eslint-plugin-unused-imports/issues/50
 * TODO What about react?
 * @see https://github.com/sweepline/eslint-plugin-unused-imports
 */
// const kpUnusedImportsRules: Rules = {
//   'no-unused-vars': 'off', // Or "@typescript-eslint/no-unused-vars": "off",
//   'unused-imports/no-unused-imports': 'error',
//   'unused-imports/no-unused-vars': [
//     'warn',
//     {
//       args: 'after-used',
//       argsIgnorePattern: '^_',
//       vars: 'all',
//       varsIgnorePattern: '^_',
//     },
//   ],
// }

const kpSharedDisableTypeCheckedRules: Rules = {
	'jsdoc/check-tag-names': ['error', { typed: false }],
	'jsdoc/no-types': 'off',
}

/**
 * Shared by several perfectionist rules
 */
const kpPerfectionistSortConfig = [
	// Note precedence sensitivity...
	// This has to come before the `min` rules to sort
	// strings like `{ minImageWidth: 1, minImageHeight: 1 }` correctly
	generatePerfectionistSortConfig(['width', 'height']),
	generatePerfectionistSortConfig(['width', 'height'], 'leading'),
	generatePerfectionistSortConfig(['Width', 'Height'], 'trailing'),

	generatePerfectionistSortConfig(['r', 'g', 'b']),
	generatePerfectionistSortConfig(['R', 'G', 'B'], 'trailing'),
	generatePerfectionistSortConfig(['red', 'green', 'blue']),
	generatePerfectionistSortConfig(['Red', 'Green', 'Blue'], 'trailing'),

	generatePerfectionistSortConfig(['h', 's', 'l']),
	generatePerfectionistSortConfig(['hue', 'saturation', 'lightness']),
	generatePerfectionistSortConfig(['h', 's', 'l', 'a']),
	generatePerfectionistSortConfig(['hue', 'saturation', 'lightness', 'alpha']),
	generatePerfectionistSortConfig(['h', 's', 'v']),

	generatePerfectionistSortConfig(['a', 'b']), // For partial matches...
	generatePerfectionistSortConfig(['r', 'g', 'b', 'a']),
	generatePerfectionistSortConfig(['red', 'green', 'blue', 'alpha']),
	generatePerfectionistSortConfig(['Red', 'Green', 'Blue', 'Alpha'], 'trailing'),

	generatePerfectionistSortConfig(['x', 'y', 'z', 'w']),
	generatePerfectionistSortConfig(['x', 'y', 'z', 'w'], 'leading'),
	generatePerfectionistSortConfig(['X', 'Y', 'Z', 'W'], 'trailing'),
	generatePerfectionistSortConfig(['x1', 'y1', 'x2', 'y2']),
	generatePerfectionistSortConfig(['x1', 'y1', 'x2', 'y2'], 'leading'),
	generatePerfectionistSortConfig(['X1', 'Y1', 'X2', 'Y2'], 'trailing'),
	generatePerfectionistSortConfig(['x1', 'y1', 'x2', 'y2', 'z1', 'z2']),
	generatePerfectionistSortConfig(['x1', 'y1', 'x2', 'y2', 'z1', 'z2'], 'leading'),
	generatePerfectionistSortConfig(['X1', 'Y1', 'X2', 'Y2', 'Z1', 'Z2'], 'trailing'),

	generatePerfectionistSortConfig(['open', 'close']),
	generatePerfectionistSortConfig(['open', 'close'], 'leading'),
	generatePerfectionistSortConfig(['Open', 'Close'], 'trailing'),

	generatePerfectionistSortConfig(['start', 'end']),
	generatePerfectionistSortConfig(['start', 'end'], 'leading'),
	generatePerfectionistSortConfig(['Start', 'End'], 'trailing'),

	generatePerfectionistSortConfig(['min', 'max']),
	generatePerfectionistSortConfig(['min', 'max'], 'leading'),
	generatePerfectionistSortConfig(['Min', 'Max'], 'trailing'),

	generatePerfectionistSortConfig(['pre', 'post']),
	generatePerfectionistSortConfig(['pre', 'post'], 'leading'),
	generatePerfectionistSortConfig(['Pre', 'post'], 'trailing'),
]

/**
 * Rules shared by JS and TS scripts
 * Partial rule set requires `files` and `languageOptions` keys to be set appropriately in file-specific configs.
 */
export const sharedScriptConfig: TypedFlatConfigItem = {
	plugins: {
		'de-morgan': pluginDeMorgan,
		depend: pluginDepend,
		// eslint-disable-next-line ts/no-unsafe-assignment
		'eslint-comments': pluginEslintComments,
		import: pluginImport,
		jsdoc: pluginJsdocComments,
		node: pluginNode,
		perfectionist: pluginPerfectionist,
		regexp: pluginRegexp,
		ts: pluginTs,
		unicorn: pluginUnicorn,
	},
	rules: {
		...eslintJavascriptRecommendedRules,
		...eslintTypescriptRecommendedOverridesRules,
		...eslintTypescriptStrictTypeCheckedRules,
		...eslintTypescriptStylisticTypeCheckedRules,
		...nodeRecommendedRules,
		...unicornRecommendedRules,
		...xoJavascriptRules,
		...xoTypescriptRules,
		...importRecommendedRules,
		...importTypescriptRules,
		...perfectionistRecommendedNaturalRules,
		...jsdocCommentsRecommendedTypescriptFlavorRules,
		...jsdocCommentsRecommendedTypescriptRules,
		...eslintCommentsRecommendedRules,
		...regexpRecommendedRules,
		...deMorganRecommendedRules,
		...dependRecommendedRules,
		'capitalized-comments': [
			'error',
			'always',
			{
				ignoreConsecutiveComments: true,
				ignoreInlineComments: true,
				// Forgive some additional common patterns arising from temporarily commenting out lines of code
				ignorePattern: String.raw`if|else|await|macOS|const|let|var|import|export|pragma|ignore|prettier-ignore|webpack\w+:|c8|type-coverage:`,
			},
		],
		'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
		'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		// Overlaps with `unicorn/no-named-default`, and gives false positives for imports from CJS modules
		'import/default': 'off',
		// IMO using the default can help with code readability / disambiguation of a function's origin
		'import/no-named-as-default-member': 'off',
		// Cope with Astro virtual modules.
		// Astro uses `astro:...` and `@astrojs/...`.
		// Starlight uses `virtual:...`.
		// https://github.com/hannoeru/vite-plugin-pages/issues/41#issuecomment-1371880072
		'import/no-unresolved': [
			'error',
			{ ignore: ['^astro:', '^@astrojs', '^virtual:', '^~aphex/', '^~photos/'] },
		],
		'import/order': 'off', // Conflicts with perfectionist/sort-imports (but never enabled)
		// Knip workaround to ignore unused exported class members:
		// https://github.com/webpro-nl/knip/issues/158#issuecomment-1632648598
		'jsdoc/check-tag-names': ['error', { definedTags: ['public'] }],
		'jsdoc/require-description': ['error', { descriptionStyle: 'body' }],
		'jsdoc/require-jsdoc': [
			'error',
			{
				publicOnly: true,
			},
		],
		'max-params': ['warn', { max: 8 }],
		'new-cap': [
			'error',
			{
				capIsNew: true,
				capIsNewExceptionPattern: String.raw`^Intl\..`,
				newIsCap: true,
			},
		],
		'no-await-in-loop': 'off',
		// TSConfig must have allowUnreachableCode: false, this is preferable because it will flag but not spontaneously delete unreachable code
		'no-unreachable': 'warn',
		'no-warning-comments': 'off',
		'node/hashbang': 'off',
		'node/no-extraneous-import': 'off',
		// Trouble resolving in ts
		'node/no-missing-import': 'off',
		// Duplicated in unicorn
		'node/no-process-exit': 'off',
		// Too many false positives
		'node/no-unpublished-import': 'off',
		'node/no-unsupported-features/node-builtins': ['error', { ignores: ['fs/promises.glob'] }],
		'perfectionist/sort-imports': [
			'error',
			{
				// Also treat $ prefix as internal
				internalPattern: ['^~/.+', '^@/.+', String.raw`^\$.+`],
				newlinesBetween: 'never',
				partitionByComment: {
					block: false,
					line: true,
				},
			},
		],
		// Too chaotic... but should revisit
		'perfectionist/sort-modules': 'off',
		'perfectionist/sort-object-types': [
			'error',
			...kpPerfectionistSortConfig,
			{ newlinesBetween: 'never', order: 'asc', type: 'natural' },
		],
		'perfectionist/sort-objects': [
			'error',
			...kpPerfectionistSortConfig,
			{ newlinesBetween: 'never', order: 'asc', type: 'natural' },
		],
		'sort-imports': 'off', // Conflicts with perfectionist/sort-imports (but never enabled)
		'ts/adjacent-overload-signatures': 'off', // Conflicts with perfectionist/sort-interfaces
		'ts/naming-convention': [
			// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md
			'error',
			// Group selectors
			{
				format: ['camelCase'],
				// Matches everything
				selector: 'default',
			},
			// Overkill
			// {
			// 	format: null,
			// 	leadingUnderscore: 'require',
			// 	modifiers: ['unused'],
			// 	selector: 'class',
			// },
			// {
			// 	format: null,
			// 	leadingUnderscore: 'require',
			// 	modifiers: ['unused'],
			// 	selector: 'enum',
			// },
			{
				format: null,
				leadingUnderscore: 'require',
				modifiers: ['unused'],
				selector: 'function',
			},
			// Overkill
			// {
			// 	format: null,
			// 	leadingUnderscore: 'require',
			// 	modifiers: ['unused'],
			// 	selector: 'interface',
			// },
			{
				format: null,
				leadingUnderscore: 'require',
				modifiers: ['unused'],
				selector: 'parameter',
			},
			// Overkill
			// {
			// 	format: null,
			// 	leadingUnderscore: 'require',
			// 	modifiers: ['unused'],
			// 	selector: 'typeAlias',
			// },
			// {
			// 	format: null,
			// 	leadingUnderscore: 'require',
			// 	modifiers: ['unused'],
			// 	selector: 'typeLike',
			// },
			// {
			// 	format: null,
			// 	leadingUnderscore: 'require',
			// 	modifiers: ['unused'],
			// 	selector: 'typeParameter',
			// },
			{
				format: null,
				leadingUnderscore: 'require',
				modifiers: ['unused'],
				selector: 'variable',
			},
			{
				format: null,
				leadingUnderscore: 'require',
				modifiers: ['unused'],
				selector: 'variableLike',
			},
			{
				format: null,
				modifiers: ['requiresQuotes'],
				// Forgive quoted things
				selector: 'default',
			},
			{
				format: ['StrictPascalCase'],
				// Matches the same as class, enum, interface, typeAlias, typeParameter
				selector: 'typeLike',
			},
			{
				format: ['camelCase'],
				leadingUnderscore: 'allow',
				// Matches the same as function, parameter and variable
				selector: 'variableLike',
				trailingUnderscore: 'allow',
			},
			{
				format: ['camelCase', 'StrictPascalCase'],
				selector: 'import',
			},
			{
				format: ['camelCase', 'StrictPascalCase'],
				modifiers: ['destructured'],
				// Allow Component import
				selector: 'variable',
			},
			{
				format: ['UPPER_CASE', 'camelCase'],
				modifiers: [
					'const',
					// 'exported'
				],
				// Allow UPPER_CASE constants, even if not exported
				selector: 'variable',
				// Not objects...
				// types: ['boolean', 'string', 'number', 'array'],
			},
			// {
			// 	filter: {
			// 		match: true,
			// 		regex: '/',
			// 	},
			// 	format: null,
			// 	selector: 'objectLiteralProperty',
			// },
		],
		'ts/no-non-null-assertion': 'off',
		'ts/no-restricted-types': [
			'error',
			{
				types: {
					'[[[[[]]]]]': "Don't use `[[[[[]]]]]`. Use `SomeType[][][][][]` instead.",
					'[[[[]]]]': "Don't use `[[[[]]]]`. Use `SomeType[][][][]` instead.",
					'[[[]]]': "Don't use `[[[]]]`. Use `SomeType[][][]` instead.",
					'[[]]':
						"Don't use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.",
					'[]': "Don't use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.",
					// eslint-disable-next-line ts/naming-convention
					Buffer: {
						message:
							'Use Uint8Array instead. See: https://sindresorhus.com/blog/goodbye-nodejs-buffer',
						suggest: ['Uint8Array'],
					},
					null: {
						message: 'Use `undefined` instead. See: https://github.com/sindresorhus/meta/issues/7',
						suggest: ['undefined'],
					},
					object: {
						message:
							'The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848',
						suggest: ['Record<string, unknown>'],
					},
				},
			},
		],
		'ts/no-unused-vars': [
			'error',
			{
				args: 'after-used',
				argsIgnorePattern: '^_',
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^_$',
				destructuredArrayIgnorePattern: '^_',
				ignoreRestSiblings: true,
				vars: 'all',
				varsIgnorePattern: '^_',
			},
		],
		'ts/sort-type-constituents': 'off', // Conflicts with perfectionist/sort-intersection-types
		'unicorn/import-style': 'off', // Conflicts with import/consistent-type-specifier-style prefer-top-level
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
					sep: false, // Present in node:path library
					src: false,
					temp: false,
					util: false,
					utils: false,
				},
			},
		],
	},
	settings: {
		// Do NOT need to rename these settings
		// From pluginImport.flatConfigs.typescript.settings,
		'import-x/extensions': ['.ts', '.tsx', '.cts', '.mts', '.js', '.jsx', '.cjs', '.mjs'],
		'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
		'import-x/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx', '.cts', '.mts'],
		},
		// 'import-x/resolver': { typescript: true },
		'import-x/resolver-next': [
			createTypeScriptImportResolver({
				alwaysTryTypes: true,
				noWarnOnMultipleProjects: true,
				project: [
					// Useful for monorepos
					'packages/*/tsconfig.json',
					'<root>/tsconfig.json',
				],
			}),
		],
	},
}

/**
 * Disable typechecked rules shared by JS and TS scripts
 */
export const sharedScriptDisableTypeCheckedRules: Rules = {
	...eslintTypescriptDisableTypeCheckedRules,
	...kpSharedDisableTypeCheckedRules,
}
