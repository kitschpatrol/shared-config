import { default as pluginJsxA11y } from 'eslint-plugin-jsx-a11y'

import type { TypedFlatConfigItem } from '../types'

import { sharedScriptConfig } from './shared-js-ts'

import { jsxA11yRecommendedRules } from '../presets'

/**
 * Shared JSX/TSX configuration "extends" sharedScriptConfig
 */
export const sharedJsxTsxConfig: TypedFlatConfigItem = {
	// TODO inherit from ...sharedScriptConfig?
	plugins: {
		...sharedScriptConfig.plugins,
		'jsx-a11y': pluginJsxA11y,
	},
	rules: {
		...sharedScriptConfig.rules,
		...jsxA11yRecommendedRules,
	},
}
