import type { Rules } from '../types'

export const svelteRecommendedRules: Rules = {
	// Brittle since there's no negative index access in dot-prop
	// Begin expansion 'eslint-plugin-svelte' 'flat/recommended[3]'
	'svelte/comment-directive': 'error',
	'svelte/infinite-reactive-loop': 'error',
	'svelte/no-at-debug-tags': 'warn',
	'svelte/no-at-html-tags': 'error',
	'svelte/no-dom-manipulating': 'error',
	'svelte/no-dupe-else-if-blocks': 'error',
	'svelte/no-dupe-on-directives': 'error',
	'svelte/no-dupe-style-properties': 'error',
	'svelte/no-dupe-use-directives': 'error',
	'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
	'svelte/no-immutable-reactive-statements': 'error',
	'svelte/no-inner-declarations': 'error',
	'svelte/no-inspect': 'warn',
	'svelte/no-not-function-handler': 'error',
	'svelte/no-object-in-text-mustaches': 'error',
	'svelte/no-raw-special-elements': 'error',
	'svelte/no-reactive-functions': 'error',
	'svelte/no-reactive-literals': 'error',
	'svelte/no-reactive-reassign': 'error',
	'svelte/no-shorthand-style-property-overrides': 'error',
	'svelte/no-store-async': 'error',
	'svelte/no-svelte-internal': 'error',
	'svelte/no-unknown-style-directive-property': 'error',
	'svelte/no-unused-svelte-ignore': 'error',
	'svelte/no-useless-children-snippet': 'error',
	'svelte/no-useless-mustaches': 'error',
	'svelte/require-each-key': 'error',
	'svelte/require-event-dispatcher-types': 'error',
	'svelte/require-store-reactive-access': 'error',
	'svelte/system': 'error',
	'svelte/valid-each-key': 'error',
	'svelte/valid-prop-names-in-kit-pages': 'error',
	// End expansion
}
