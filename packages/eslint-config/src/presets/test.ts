import type { Rules } from '../types'

export const testRecommendedRules: Rules = {
	// Begin expansion '@vitest/eslint-plugin' 'recommended'
	'test/expect-expect': 'error',
	'test/no-conditional-expect': 'error',
	'test/no-disabled-tests': 'warn',
	'test/no-focused-tests': 'error',
	'test/no-commented-out-tests': 'error',
	'test/no-identical-title': 'error',
	'test/no-import-node-test': 'error',
	'test/no-interpolation-in-snapshots': 'error',
	'test/no-mocks-import': 'error',
	'test/no-standalone-expect': 'error',
	'test/no-unneeded-async-expect-function': 'error',
	'test/prefer-called-exactly-once-with': 'error',
	'test/require-local-test-context-for-concurrent-snapshots': 'error',
	'test/valid-describe-callback': 'error',
	'test/valid-expect': 'error',
	'test/valid-expect-in-promise': 'error',
	'test/valid-title': 'error',
	// End expansion
}
