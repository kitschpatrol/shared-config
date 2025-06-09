import type { Rules } from '../types'

// Note that 'json-package/order-properties' defaults to 'sort-package-json'
export const jsonPackageRecommendedRules: Rules = {
	// Begin expansion 'eslint-plugin-package-json' 'configs.recommended.rules'
	'json-package/no-empty-fields': 'error',
	'json-package/order-properties': 'error',
	'json-package/require-description': 'error',
	'json-package/require-name': 'error',
	'json-package/require-type': 'error',
	'json-package/require-version': 'error',
	'json-package/repository-shorthand': 'error',
	'json-package/sort-collections': 'error',
	'json-package/unique-dependencies': 'error',
	'json-package/valid-local-dependency': 'error',
	'json-package/valid-name': 'error',
	'json-package/valid-package-definition': 'error',
	'json-package/valid-repository-directory': 'error',
	'json-package/valid-version': 'error',
	// End expansion
}
