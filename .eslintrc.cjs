/* @type {import('eslint').Linter.Config} */
module.exports = {
	extends: ['@kitschpatrol/eslint-config'],
	overrides: [
		{
			files: ['src/**/*', 'scripts/**/*', 'packages/*/src/**/*', 'packages/*/scripts/**/*'],
			rules: {
				'n/no-unpublished-import': 'off',
				'n/shebang': 'off',
			},
		},
	],
	root: true,
}
