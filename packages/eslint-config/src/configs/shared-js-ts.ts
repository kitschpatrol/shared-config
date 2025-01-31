import { default as pluginEslintComments } from '@eslint-community/eslint-plugin-eslint-comments'
import { default as pluginTs } from '@typescript-eslint/eslint-plugin'
import { default as pluginDepend } from 'eslint-plugin-depend'
import { default as pluginImport } from 'eslint-plugin-import-x'
import { default as pluginJsdocComments } from 'eslint-plugin-jsdoc'
import { default as pluginNode } from 'eslint-plugin-n'
import { default as pluginPerfectionist } from 'eslint-plugin-perfectionist'
import * as pluginRegexp from 'eslint-plugin-regexp'
import { default as pluginUnicorn } from 'eslint-plugin-unicorn'

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

// TODO revisit these...
const kpSharedScriptRules: Rules = {
	'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
	// 'node/handle-callback-err': ['error', '^(err|error)$'],
	// 'node/no-new-require': 'error',
	// 'node/no-path-concat': 'error',
	// 'node/prefer-global/buffer': ['error', 'never'],
	// 'node/prefer-global/process': ['error', 'never'],
	// 'node/process-exit-as-throw': 'error',
	'jsdoc/require-description': ['error', { descriptionStyle: 'body' }],
	'jsdoc/require-jsdoc': [
		'error',
		{
			publicOnly: true,
		},
	],
	'no-await-in-loop': 'off',
	'no-warning-comments': 'off',
	'node/hashbang': 'off',
	'node/no-extraneous-import': 'off',
	'node/no-missing-import': 'off',
	'node/no-process-exit': 'off', // Duplicated in unicorn
	'node/no-unsupported-features/node-builtins': ['error', { ignores: ['fs/promises.glob'] }],
	'perfectionist/sort-objects': [
		'error',
		{ newlinesBetween: 'never', order: 'asc', type: 'natural' },
	],
	'ts/no-non-null-assertion': 'off',
}

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
		...kpSharedScriptRules,
	},
	settings: {
		// Do NOT need to rename these settings
		// From pluginImport.flatConfigs.typescript.settings,
		'import-x/extensions': ['.ts', '.tsx', '.cts', '.mts', '.js', '.jsx', '.cjs', '.mjs'],
		'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
		'import-x/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx', '.cts', '.mts'],
		},
		'import-x/resolver': { typescript: true },
	},
}

/**
 * Disable typechecked rules shared by JS and TS scripts
 */
export const sharedScriptDisableTypeCheckedRules: Rules = {
	...eslintTypescriptDisableTypeCheckedRules,
	...kpSharedDisableTypeCheckedRules,
}
