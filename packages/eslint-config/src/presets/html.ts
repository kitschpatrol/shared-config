import type { Rules } from '../types'

export const htmlRecommendedRules: Rules = {
	// Begin expansion '@html-eslint/eslint-plugin' 'flat/recommended'
	'html/require-lang': 'error',
	'html/require-img-alt': 'error',
	'html/require-doctype': 'error',
	'html/require-title': 'error',
	'html/no-multiple-h1': 'error',
	'html/no-extra-spacing-attrs': 'error',
	'html/attrs-newline': 'error',
	'html/element-newline': ['error', { inline: ['$inline'] }],
	'html/no-duplicate-id': 'error',
	'html/indent': 'error',
	'html/require-li-container': 'error',
	'html/quotes': 'error',
	'html/no-obsolete-tags': 'error',
	'html/require-closing-tags': 'error',
	'html/no-duplicate-attrs': 'error',
	// End expansion
}
