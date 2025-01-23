import { default as pluginTest } from '@vitest/eslint-plugin'
import { default as pluginNoOnlyTests } from 'eslint-plugin-no-only-tests'
import globals from 'globals'

import type { OptionsIsInEditor, OptionsOverrides, Rules, TypedFlatConfigItem } from '../types'

import { GLOB_TESTS } from '../globs'

const testRecommendedRules: Rules = {
	// Begin expansion '@vitest/eslint-plugin' 'recommended'
	'test/expect-expect': 'error',
	'test/no-commented-out-tests': 'error',
	'test/no-identical-title': 'error',
	'test/no-import-node-test': 'error',
	'test/require-local-test-context-for-concurrent-snapshots': 'error',
	'test/valid-describe-callback': 'error',
	'test/valid-expect': 'error',
	'test/valid-title': 'error',
	// End expansion
}

// Hold the reference so we don't redeclare the plugin on each call
let _pluginTest: any

/**
 *
 */
export async function test(
	options: OptionsIsInEditor & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
	const { isInEditor = false, overrides = {} } = options

	_pluginTest ||= {
		...pluginTest,
		rules: {
			...pluginTest.rules,
			// Extend `test/no-only-tests` rule
			// eslint-disable-next-line ts/no-unsafe-member-access
			...pluginNoOnlyTests.rules,
		},
	}

	return [
		{
			name: 'kp/test/setup',
			plugins: {
				test: _pluginTest,
			},
			settings: {
				vitest: {
					typecheck: true,
				},
			},
		},
		{
			files: [GLOB_TESTS],
			languageOptions: {
				globals: {
					// TODO more globals?
					...globals.vitest,
				},
			},
			name: 'kp/test/rules',
			rules: {
				...testRecommendedRules,
				'test/no-only-tests': isInEditor ? 'off' : 'error',
				...overrides,
			},
		},
	]
}
