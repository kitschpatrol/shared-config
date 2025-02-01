import { default as pluginTest } from '@vitest/eslint-plugin'
import { default as pluginNoOnlyTests } from 'eslint-plugin-no-only-tests'
import globals from 'globals'

import type { OptionsIsInEditor, OptionsOverrides, TypedFlatConfigItem } from '../types'

import { GLOB_TESTS } from '../globs'
import { testRecommendedRules } from '../presets'

// Hold the reference so we don't redeclare the plugin on each call
let _pluginTest: any

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
