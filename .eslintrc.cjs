/* @type {import('eslint').Linter.Config} */
module.exports = {
	extends: ['@kitschpatrol/eslint-config'],
	overrides: [
		{
			files: ['src/**/*', 'packages/*/src/**/*'],
			rules: {
				'n/no-unpublished-import': 'off',
				'n/shebang': 'off',
			},
		},
	],
};
