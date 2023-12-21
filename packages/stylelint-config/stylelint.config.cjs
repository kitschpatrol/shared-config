/* eslint-disable perfectionist/sort-objects */
/* eslint-disable unicorn/no-null */
const { propertyGroups } = require('stylelint-config-clean-order')

const propertiesOrder = propertyGroups.map((properties) => ({
	emptyLineBefore: 'never', // Don't add empty lines between order groups.
	noEmptyLineBetween: true,
	properties,
}))

/** @type {import("stylelint").Config} */
module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-clean-order', 'stylelint-config-html'],
	rules: {
		'color-hex-length': null,
		'comment-empty-line-before': null,
		'declaration-empty-line-before': null,
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
	overrides: [
		{
			// Not unusual to have empty style tags in an Astro template
			files: ['*.astro'],
			rules: {
				'no-empty-source': null,
			},
		},
	],
}
