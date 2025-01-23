import type { OptionsOverrides, OptionsTypeAware, Rules, TypedFlatConfigItem } from '../types'

// Wat?
import { GLOB_ASTRO_TS, GLOB_MARKDOWN, GLOB_MDX, GLOB_SRC } from '../globs'
import { interopDefault } from '../utils'

// eslint-react is preferred over eslint-plugin-react?

// Includes all of recommended-typescript, which includes all recommended rules that aren't better handled by type-unaware typescript
const reactRecommendedTypeCheckedRules: Rules = {
	// Begin expansion '@eslint-react/eslint-plugin' 'recommended-type-checked'
	'react-dom/no-dangerously-set-innerhtml': 'warn',
	'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
	'react-dom/no-find-dom-node': 'error',
	'react-dom/no-missing-button-type': 'warn',
	'react-dom/no-missing-iframe-sandbox': 'warn',
	'react-dom/no-namespace': 'error',
	'react-dom/no-render-return-value': 'error',
	'react-dom/no-script-url': 'warn',
	'react-dom/no-unknown-property': 'off',
	'react-dom/no-unsafe-iframe-sandbox': 'warn',
	'react-dom/no-unsafe-target-blank': 'warn',
	'react-dom/no-void-elements-with-children': 'warn',
	'react-hooks-extra/no-direct-set-state-in-use-effect': 'warn',
	'react-hooks-extra/no-useless-custom-hooks': 'warn',
	'react-hooks-extra/prefer-use-state-lazy-initialization': 'warn',
	'react-web-api/no-leaked-event-listener': 'warn',
	'react-web-api/no-leaked-interval': 'warn',
	'react-web-api/no-leaked-resize-observer': 'warn',
	'react-web-api/no-leaked-timeout': 'warn',
	'react/ensure-forward-ref-using-ref': 'warn',
	'react/no-access-state-in-setstate': 'error',
	'react/no-array-index-key': 'warn',
	'react/no-children-count': 'warn',
	'react/no-children-for-each': 'warn',
	'react/no-children-map': 'warn',
	'react/no-children-only': 'warn',
	'react/no-children-to-array': 'warn',
	'react/no-clone-element': 'warn',
	'react/no-comment-textnodes': 'warn',
	'react/no-component-will-mount': 'error',
	'react/no-component-will-receive-props': 'error',
	'react/no-component-will-update': 'error',
	'react/no-context-provider': 'warn',
	'react/no-create-ref': 'error',
	'react/no-default-props': 'error',
	'react/no-direct-mutation-state': 'error',
	'react/no-duplicate-jsx-props': 'off',
	'react/no-duplicate-key': 'error',
	'react/no-forward-ref': 'warn',
	'react/no-implicit-key': 'warn',
	'react/no-leaked-conditional-rendering': 'warn',
	'react/no-missing-key': 'error',
	'react/no-nested-components': 'error',
	'react/no-prop-types': 'error',
	'react/no-redundant-should-component-update': 'error',
	'react/no-set-state-in-component-did-mount': 'warn',
	'react/no-set-state-in-component-did-update': 'warn',
	'react/no-set-state-in-component-will-update': 'warn',
	'react/no-string-refs': 'error',
	'react/no-unsafe-component-will-mount': 'warn',
	'react/no-unsafe-component-will-receive-props': 'warn',
	'react/no-unsafe-component-will-update': 'warn',
	'react/no-unstable-context-value': 'warn',
	'react/no-unstable-default-props': 'warn',
	'react/no-unused-class-component-members': 'warn',
	'react/no-unused-state': 'warn',
	'react/use-jsx-vars': 'off',
	// End expansion
}

const reactDisableTypeCheckedRules: Rules = {
	// Begin expansion '@eslint-react/eslint-plugin' 'disable-type-checked'
	'react/no-leaked-conditional-rendering': 'off',
	'react/prefer-read-only-props': 'off',
	// End expansion
}

/**
 *
 */
export async function react(
	options: OptionsOverrides & OptionsTypeAware = {},
): Promise<TypedFlatConfigItem[]> {
	const {
		overrides = {},
		typeAware = {
			enabled: true,
			ignores: [],
		},
	} = options

	const files = [GLOB_SRC, `${GLOB_MARKDOWN}/**`, `${GLOB_MDX}/**`, GLOB_ASTRO_TS]
	const ignoresTypeAware = [
		`${GLOB_MARKDOWN}/**`,
		`${GLOB_MDX}/**`,
		GLOB_ASTRO_TS,
		...typeAware.ignores,
	]

	const pluginReact = await interopDefault(import('@eslint-react/eslint-plugin'))

	const recommendedTypescriptConfig = pluginReact.configs['recommended-typescript']
	const { plugins } = recommendedTypescriptConfig

	return [
		{
			name: 'kp/react/setup',
			plugins: {
				react: plugins['@eslint-react'],
				'react-debug': plugins['@eslint-react/debug'],
				'react-dom': plugins['@eslint-react/dom'],
				'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
				'react-naming-convention': plugins['@eslint-react/naming-convention'],
				'react-web-api': plugins['@eslint-react/web-api'],
			},
			settings: recommendedTypescriptConfig.settings,
		},
		{
			files,
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						impliedStrict: true,
						jsx: true,
					},
				},
				sourceType: 'module',
			},
			name: 'kp/react/rules',
			rules: {
				...reactRecommendedTypeCheckedRules,
				...(typeAware.enabled ? {} : reactDisableTypeCheckedRules),
				...overrides,
			},
		},
		typeAware.enabled
			? {
					files: ignoresTypeAware,
					languageOptions: {
						parserOptions: {
							ecmaFeatures: {
								impliedStrict: true,
								jsx: true,
							},
							projectService: false,
						},
					},
					name: 'kp/react/disable-type-aware',
					rules: {
						...reactDisableTypeCheckedRules,
					},
				}
			: {},
	]
}
