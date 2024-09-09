/* eslint-disable perfectionist/sort-objects */
/* @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	extends: ['@envsa/eslint-config'],
	overrides: [
		{
			files: ['src/**/*', 'scripts/**/*', 'packages/*/src/**/*', 'packages/*/scripts/**/*'],
			rules: {
				'n/no-unpublished-import': 'off',
				'n/hashbang': 'off',
			},
		},
	],
}
