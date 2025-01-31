import type { Rules } from '../types'

export const importRecommendedRules: Rules = {
	// Begin expansion 'eslint-plugin-import-x' 'recommended'
	'import/no-unresolved': 'error',
	'import/named': 'error',
	'import/namespace': 'error',
	'import/default': 'error',
	'import/export': 'error',
	'import/no-named-as-default': 'warn',
	'import/no-named-as-default-member': 'warn',
	'import/no-duplicates': 'warn',
	// End expansion
}

export const importTypescriptRules: Rules = {
	// Begin expansion 'eslint-plugin-import-x' 'typescript'
	'import/named': 'off',
	// End expansion
}
