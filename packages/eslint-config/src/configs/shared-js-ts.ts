import pluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import pluginTs from '@typescript-eslint/eslint-plugin'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import * as pluginDepend from 'eslint-plugin-depend'
import pluginImport from 'eslint-plugin-import-x'
import pluginJsdocComments from 'eslint-plugin-jsdoc'
import pluginNode from 'eslint-plugin-n'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import * as pluginRegexp from 'eslint-plugin-regexp'
import pluginUnicorn from 'eslint-plugin-unicorn'
import type { Rules, TypedFlatConfigItem } from '../types'
import {
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
 * Rules shared by JS and TS scripts
 * Partial rule set requires `files` and `languageOptions` keys to be set appropriately in file-specific configs.
 */
export const sharedScriptConfig: TypedFlatConfigItem = {
	plugins: {
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
		...dependRecommendedRules,
		'capitalized-comments': [
			'error',
			'always',
			{
				ignoreConsecutiveComments: true,
				ignoreInlineComments: true,
				// Forgive some additional common patterns arising from temporarily commenting out lines of code
				ignorePattern: String.raw`if|else|await|const|let|var|import|export|pragma|ignore|prettier-ignore|webpack\w+:|c8|type-coverage:`,
			},
		],
		'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
		// Overlaps with `unicorn/no-named-default`, and gives false positives for imports from CJS modules
		'import/default': 'off',
		// Cope with Astro virtual modules
		// https://github.com/hannoeru/vite-plugin-pages/issues/41#issuecomment-1371880072
		'import/no-unresolved': ['error', { ignore: ['^astro:'] }],
		'import/order': 'off', // Conflicts with perfectionist/sort-imports (but never enabled)
		'jsdoc/require-description': ['error', { descriptionStyle: 'body' }],
		'jsdoc/require-jsdoc': [
			'error',
			{
				publicOnly: true,
			},
		],
		'max-params': ['warn', { max: 8 }],
		'no-await-in-loop': 'off',
		'no-unreachable': 'warn', // TSConfig must have allowUnreachableCode: false, this is preferable because it will flag but not spontaneously delete unreachable code
		'no-warning-comments': 'off',
		'node/hashbang': 'off',
		'node/no-extraneous-import': 'off',
		'node/no-missing-import': 'off', // Trouble resolving in ts
		'node/no-process-exit': 'off', // Duplicated in unicorn
		'node/no-unsupported-features/node-builtins': ['error', { ignores: ['fs/promises.glob'] }],
		'perfectionist/sort-imports': [
			'error',
			{
				newlinesBetween: 'never',
				partitionByComment: {
					block: false,
					line: true,
				},
			},
		],
		// Too chaotic... but should revisit
		'perfectionist/sort-modules': 'off',
		'perfectionist/sort-objects': [
			'error',
			generatePerfectionistSortConfig(['X', 'Y', 'Z', 'W'], { matchTrailing: true }),
			generatePerfectionistSortConfig(['Min', 'Max'], { matchTrailing: true }),
			generatePerfectionistSortConfig(['Width', 'Height'], { matchTrailing: true }),
			generatePerfectionistSortConfig(['r', 'g', 'b']),
			generatePerfectionistSortConfig(['h', 's', 'l']),
			generatePerfectionistSortConfig(['h', 's', 'l', 'a']),
			generatePerfectionistSortConfig(['h', 's', 'v']),
			generatePerfectionistSortConfig(['a', 'b']), // For partial matches...
			generatePerfectionistSortConfig(['r', 'g', 'b', 'a']),
			generatePerfectionistSortConfig(['x', 'y', 'z', 'w']),
			generatePerfectionistSortConfig(['min', 'max']),
			generatePerfectionistSortConfig(['width', 'height']),
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
				modifiers: ['const', 'exported'],
				// Allow UPPER_CASE const exports
				selector: 'variable',
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
