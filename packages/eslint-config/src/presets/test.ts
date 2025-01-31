import type { Rules } from '../types'

export const testRecommendedRules: Rules = {
	// Begin expansion '@vitest/eslint-plugin' 'recommended'
	'test/expect-expect': 'error',
	'test/no-identical-title': 'error',
	'test/no-commented-out-tests': 'error',
	'test/valid-title': 'error',
	'test/valid-expect': 'error',
	'test/valid-describe-callback': 'error',
	'test/require-local-test-context-for-concurrent-snapshots': 'error',
	'test/no-import-node-test': 'error',
	// End expansion
}
