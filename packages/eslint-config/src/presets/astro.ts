import type { Rules } from '../types'

export const astroRecommendedRules: Rules = {
	// Brittle since there's no negative index access in dot-prop
	// Begin expansion 'eslint-plugin-astro' 'flat/recommended[4]'
	'astro/missing-client-only-directive-value': 'error',
	'astro/no-conflict-set-directives': 'error',
	'astro/no-deprecated-astro-canonicalurl': 'error',
	'astro/no-deprecated-astro-fetchcontent': 'error',
	'astro/no-deprecated-astro-resolve': 'error',
	'astro/no-deprecated-getentrybyslug': 'error',
	'astro/no-unused-define-vars-in-style': 'error',
	'astro/valid-compile': 'error',
	// End expansion
}

export const astroJsxA11yRecommendedRules: Rules = {
	// Brittle since there's no negative index access in dot-prop
	// Begin expansion 'eslint-plugin-astro' 'flat/jsx-a11y-recommended[4]'
	'astro/jsx-a11y/alt-text': 'error',
	'astro/jsx-a11y/anchor-ambiguous-text': 'off',
	'astro/jsx-a11y/anchor-has-content': 'error',
	'astro/jsx-a11y/anchor-is-valid': 'error',
	'astro/jsx-a11y/aria-activedescendant-has-tabindex': 'error',
	'astro/jsx-a11y/aria-props': 'error',
	'astro/jsx-a11y/aria-proptypes': 'error',
	'astro/jsx-a11y/aria-role': 'error',
	'astro/jsx-a11y/aria-unsupported-elements': 'error',
	'astro/jsx-a11y/autocomplete-valid': 'error',
	'astro/jsx-a11y/click-events-have-key-events': 'error',
	'astro/jsx-a11y/control-has-associated-label': [
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
	'astro/jsx-a11y/heading-has-content': 'error',
	'astro/jsx-a11y/html-has-lang': 'error',
	'astro/jsx-a11y/iframe-has-title': 'error',
	'astro/jsx-a11y/img-redundant-alt': 'error',
	'astro/jsx-a11y/interactive-supports-focus': [
		'error',
		{ tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox'] },
	],
	'astro/jsx-a11y/label-has-associated-control': 'error',
	// "astro/jsx-a11y/label-has-for":"off",
	'astro/jsx-a11y/media-has-caption': 'error',
	'astro/jsx-a11y/mouse-events-have-key-events': 'error',
	'astro/jsx-a11y/no-access-key': 'error',
	'astro/jsx-a11y/no-autofocus': 'error',
	'astro/jsx-a11y/no-distracting-elements': 'error',
	'astro/jsx-a11y/no-interactive-element-to-noninteractive-role': [
		'error',
		{ tr: ['none', 'presentation'], canvas: ['img'] },
	],
	'astro/jsx-a11y/no-noninteractive-element-interactions': [
		'error',
		{
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
			alert: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
			body: ['onError', 'onLoad'],
			dialog: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
			iframe: ['onError', 'onLoad'],
			img: ['onError', 'onLoad'],
		},
	],
	'astro/jsx-a11y/no-noninteractive-element-to-interactive-role': [
		'error',
		{
			ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
			ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
			li: ['menuitem', 'menuitemradio', 'menuitemcheckbox', 'option', 'row', 'tab', 'treeitem'],
			table: ['grid'],
			td: ['gridcell'],
			fieldset: ['radiogroup', 'presentation'],
		},
	],
	'astro/jsx-a11y/no-noninteractive-tabindex': [
		'error',
		{ tags: [], roles: ['tabpanel'], allowExpressionValues: true },
	],
	'astro/jsx-a11y/no-redundant-roles': 'error',
	'astro/jsx-a11y/no-static-element-interactions': [
		'error',
		{
			allowExpressionValues: true,
			handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
		},
	],
	'astro/jsx-a11y/role-has-required-aria-props': 'error',
	'astro/jsx-a11y/role-supports-aria-props': 'error',
	'astro/jsx-a11y/scope': 'error',
	'astro/jsx-a11y/tabindex-no-positive': 'error',
	// End expansion
}
