import type { Rules } from '../types'

export const svelteRecommendedRules: Rules = {
	// Begin expansion 'eslint-plugin-svelte' 'recommended'
	'svelte/comment-directive': 'error',
	'svelte/no-at-debug-tags': 'warn',
	'svelte/no-at-html-tags': 'error',
	'svelte/no-dupe-else-if-blocks': 'error',
	'svelte/no-dupe-style-properties': 'error',
	'svelte/no-dynamic-slot-name': 'error',
	'svelte/no-inner-declarations': 'error',
	'svelte/no-not-function-handler': 'error',
	'svelte/no-object-in-text-mustaches': 'error',
	'svelte/no-shorthand-style-property-overrides': 'error',
	'svelte/no-unknown-style-directive-property': 'error',
	'svelte/no-unused-svelte-ignore': 'error',
	'svelte/system': 'error',
	'svelte/valid-compile': 'error',
	// End expansion
}
