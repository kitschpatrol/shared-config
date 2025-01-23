import globals from 'globals'
import path from 'node:path'
import process from 'node:process'

import type {
	OptionsOverrides,
	OptionsOverridesEmbeddedScripts,
	OptionsTypeAware,
	Rules,
	TypedFlatConfigItem,
} from '../types'

import { GLOB_ASTRO, GLOB_ASTRO_JS, GLOB_ASTRO_TS } from '../globs'
import { tsParser } from '../parsers'
import { interopDefault } from '../utils'
import { sharedScriptConfig, sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

const astroRecommendedRules: Rules = {
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

const astroJsxA11yRecommendedRules: Rules = {
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
		{
			tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox'],
		},
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
		{ canvas: ['img'], tr: ['none', 'presentation'] },
	],
	'astro/jsx-a11y/no-noninteractive-element-interactions': [
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
	'astro/jsx-a11y/no-noninteractive-element-to-interactive-role': [
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
	'astro/jsx-a11y/no-noninteractive-tabindex': [
		'error',
		{ allowExpressionValues: true, roles: ['tabpanel'], tags: [] },
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

/**
 *
 */
export async function astro(
	options: OptionsOverrides & OptionsOverridesEmbeddedScripts & OptionsTypeAware = {},
): Promise<TypedFlatConfigItem[]> {
	const {
		overrides = {},
		overridesEmbeddedScripts = {},
		typeAware = {
			enabled: true,
			ignores: [],
		},
	} = options

	// Configs that can be disabled import dependencies dynamically?
	// TODO worth it?
	const [pluginAstro, parserAstro] = await Promise.all([
		interopDefault(import('eslint-plugin-astro')),
		interopDefault(import('astro-eslint-parser')),
	] as const)

	return [
		{
			name: 'kp/astro/setup',
			plugins: {
				astro: pluginAstro,
			},
		},
		{
			files: [GLOB_ASTRO],
			languageOptions: {
				globals: {
					...globals.nodeBuiltin, // TODO plugin itself uses .node in its config?
					...pluginAstro.environments.astro.globals,
				},
				parser: parserAstro,
				parserOptions: {
					extraFileExtensions: ['.astro'],
					parser: tsParser,
					...(typeAware.enabled
						? {
								// Not yet compatible with projectService
								project: path.join(process.cwd(), 'tsconfig.json'), // Not sure why this isn't inherited
							}
						: {
								project: undefined,
							}),
				},
			},
			name: 'kp/astro/rules',
			processor: 'astro/client-side-ts',
			rules: {
				...sharedScriptConfig.rules,
				...astroRecommendedRules,
				...astroJsxA11yRecommendedRules,
				...overrides,
			},
		},
		typeAware.ignores.length > 0
			? {
					files: typeAware.ignores,
					languageOptions: {
						parserOptions: {
							project: undefined,
							projectService: false,
						},
					},
					name: 'kp/astro/disable-type-aware',
					rules: {
						...sharedScriptDisableTypeCheckedRules,
					},
				}
			: {},
		// Via https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/configs/flat/base.ts#L56
		{
			files: [GLOB_ASTRO_JS],
			languageOptions: {
				ecmaVersion: 2023,
				globals: {
					...globals.browser,
				},
				parser: undefined,
				sourceType: 'module',
			},
			// Define the configuration for `<script>` tag.
			// Script in `<script>` is assigned a virtual file name with the `.js` extension.
			// This is unreachable since we use `client-side-ts` processor?
			name: 'kp/astro/script-js',
			rules: {
				...sharedScriptDisableTypeCheckedRules,
				...overridesEmbeddedScripts,
			},
		},
		{
			files: [GLOB_ASTRO_TS],
			languageOptions: {
				ecmaVersion: 2023,
				globals: {
					...globals.browser,
				},
				parser: tsParser,
				// No typed rules?
				parserOptions: {
					projectService: false,
				},
				sourceType: 'module',
			},
			// Define the configuration for `<script>` tag when using `client-side-ts` processor.
			// Script in `<script>` is assigned a virtual file name with the `.ts` extension.
			name: 'kp/astro/script-ts',
			rules: {
				...sharedScriptDisableTypeCheckedRules,
				...overridesEmbeddedScripts,
			},
		},
	]
}
