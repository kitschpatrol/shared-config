import type { Rules } from '../types'

// Includes all of recommended-typescript, which includes all recommended rules that aren't better handled by type-unaware typescript
export const reactRecommendedTypeCheckedRules: Rules = {
	// Begin expansion '@eslint-react/eslint-plugin' 'recommended-type-checked'
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
	'react/no-use-context': 'warn',
	'react/use-jsx-vars': 'off',
	'react-dom/no-dangerously-set-innerhtml': 'warn',
	'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
	'react-dom/no-find-dom-node': 'error',
	'react-dom/no-missing-button-type': 'warn',
	'react-dom/no-missing-iframe-sandbox': 'warn',
	'react-dom/no-namespace': 'error',
	'react-dom/no-render-return-value': 'error',
	'react-dom/no-script-url': 'warn',
	'react-dom/no-unsafe-iframe-sandbox': 'warn',
	'react-dom/no-unsafe-target-blank': 'warn',
	'react-dom/no-void-elements-with-children': 'warn',
	'react-web-api/no-leaked-event-listener': 'warn',
	'react-web-api/no-leaked-interval': 'warn',
	'react-web-api/no-leaked-resize-observer': 'warn',
	'react-web-api/no-leaked-timeout': 'warn',
	'react-hooks-extra/no-direct-set-state-in-use-effect': 'warn',
	'react-hooks-extra/no-useless-custom-hooks': 'warn',
	'react-hooks-extra/prefer-use-state-lazy-initialization': 'warn',
	'react-dom/no-unknown-property': 'off',
	'react/no-leaked-conditional-rendering': 'warn',
	// End expansion
}

export const reactDisableTypeCheckedRules: Rules = {
	// Begin expansion '@eslint-react/eslint-plugin' 'disable-type-checked'
	'react/no-leaked-conditional-rendering': 'off',
	'react/prefer-read-only-props': 'off',
	// End expansion
}
