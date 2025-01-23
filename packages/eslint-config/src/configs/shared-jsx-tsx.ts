import { default as pluginJsxA11y } from 'eslint-plugin-jsx-a11y'

import type { Rules, TypedFlatConfigItem } from '../types'

import { sharedScriptConfig } from './shared-js-ts'

const jsxA11yRecommendedRules: Rules = {
	// Begin expansion 'eslint-plugin-jsx-a11y' 'flatConfigs.recommended.rules'
	'jsx-a11y/alt-text': 'error',
	'jsx-a11y/anchor-ambiguous-text': 'off',
	'jsx-a11y/anchor-has-content': 'error',
	'jsx-a11y/anchor-is-valid': 'error',
	'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
	'jsx-a11y/aria-props': 'error',
	'jsx-a11y/aria-proptypes': 'error',
	'jsx-a11y/aria-role': 'error',
	'jsx-a11y/aria-unsupported-elements': 'error',
	'jsx-a11y/autocomplete-valid': 'error',
	'jsx-a11y/click-events-have-key-events': 'error',
	'jsx-a11y/control-has-associated-label': [
		'off',
		{
			ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video'],
			ignoreRoles: [
				'grid',
				'listbox',
				'menu',
				'menubar',
				'radiogroup',
				'row',
				'tablist',
				'toolbar',
				'tree',
				'treegrid',
			],
			includeRoles: ['alert', 'dialog'],
		},
	],
	'jsx-a11y/heading-has-content': 'error',
	'jsx-a11y/html-has-lang': 'error',
	'jsx-a11y/iframe-has-title': 'error',
	'jsx-a11y/img-redundant-alt': 'error',
	'jsx-a11y/interactive-supports-focus': [
		'error',
		{
			tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox'],
		},
	],
	'jsx-a11y/label-has-associated-control': 'error',
	'jsx-a11y/label-has-for': 'off',
	'jsx-a11y/media-has-caption': 'error',
	'jsx-a11y/mouse-events-have-key-events': 'error',
	'jsx-a11y/no-access-key': 'error',
	'jsx-a11y/no-autofocus': 'error',
	'jsx-a11y/no-distracting-elements': 'error',
	'jsx-a11y/no-interactive-element-to-noninteractive-role': [
		'error',
		{ canvas: ['img'], tr: ['none', 'presentation'] },
	],
	'jsx-a11y/no-noninteractive-element-interactions': [
		'error',
		{
			alert: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
			body: ['onError', 'onLoad'],
			dialog: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
			handlers: [
				'onClick',
				'onError',
				'onLoad',
				'onMouseDown',
				'onMouseUp',
				'onKeyPress',
				'onKeyDown',
				'onKeyUp',
			],
			iframe: ['onError', 'onLoad'],
			img: ['onError', 'onLoad'],
		},
	],
	'jsx-a11y/no-noninteractive-element-to-interactive-role': [
		'error',
		{
			fieldset: ['radiogroup', 'presentation'],
			li: ['menuitem', 'menuitemradio', 'menuitemcheckbox', 'option', 'row', 'tab', 'treeitem'],
			ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
			table: ['grid'],
			td: ['gridcell'],
			ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
		},
	],
	'jsx-a11y/no-noninteractive-tabindex': [
		'error',
		{ allowExpressionValues: true, roles: ['tabpanel'], tags: [] },
	],
	'jsx-a11y/no-redundant-roles': 'error',
	'jsx-a11y/no-static-element-interactions': [
		'error',
		{
			allowExpressionValues: true,
			handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
		},
	],
	'jsx-a11y/role-has-required-aria-props': 'error',
	'jsx-a11y/role-supports-aria-props': 'error',
	'jsx-a11y/scope': 'error',
	'jsx-a11y/tabindex-no-positive': 'error',
	// End expansion
}

/**
 * Shared JSX/TSX configuration "extends" sharedScriptConfig
 */
export const sharedJsxTsxConfig: TypedFlatConfigItem = {
	plugins: {
		...sharedScriptConfig.plugins,
		'jsx-a11y': pluginJsxA11y,
	},
	rules: {
		...sharedScriptConfig.rules,
		...jsxA11yRecommendedRules,
	},
}
