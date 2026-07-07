/* eslint-disable unicorn/no-null */
import type { Config as StylelintConfig } from 'stylelint'
import { propertyGroups } from 'stylelint-config-clean-order'

const propertiesOrder = propertyGroups.map((properties) => ({
	emptyLineBefore: 'never', // Don't add empty lines between order groups.
	noEmptyLineBetween: true,
	properties,
}))

export const sharedStylelintConfig: StylelintConfig = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-clean-order',
		'stylelint-config-html',
		'stylelint-plugin-defensive-css/configs/recommended',
	],
	overrides: [
		{
			// Not unusual to have empty style tags in an Astro template
			files: ['*.astro'],
			rules: {
				'no-empty-source': null,
			},
		},
	],
	rules: {
		'color-hex-length': null,
		'comment-empty-line-before': null,
		'declaration-empty-line-before': null,
		// Deliberate user-select: none is legitimate in interactive UI
		'defensive-css/no-user-select-none': null,
		// Named grid lines are overkill for simple grids
		'defensive-css/require-named-grid-lines': null,
		// Element selectors are idiomatic in scoped Svelte and Astro style blocks
		'defensive-css/require-pure-selectors': null,
		// 'at-rule-empty-line-before': 'never',
		'order/properties-order': [
			propertiesOrder,
			{
				severity: 'error',
				unspecified: 'bottomAlphabetical',
			},
		],
		'selector-class-pattern': null,
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global'],
			},
		],
	},
}

/**
 * **@Kitschpatrol's Shared Stylelint Configuration**
 *
 * @example
 * 	import { stylelintConfig } from '@kitschpatrol/stylelint-config'
 *
 * 	export default stylelintConfig({
 * 		ignoreFiles: ['example.html'],
 * 		rules: {
 * 			'alpha-value-notation': 'number',
 * 			'selector-class-pattern': null,
 * 		},
 * 	})
 *
 * @see [@kitschpatrol/stylelint-config](https://github.com/kitschpatrol/shared-config/tree/main/packages/stylelint-config)
 *
 * @see [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config)
 */
export function stylelintConfig(config?: StylelintConfig): StylelintConfig {
	return {
		extends: '@kitschpatrol/stylelint-config',
		...config,
	}
}

export { type Config as StylelintConfig } from 'stylelint'
