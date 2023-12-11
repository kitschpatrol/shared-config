/* @type {import('eslint').Linter.Config} */
module.exports = {
	extends: ['@kitschpatrol/eslint-config'],
	overrides: [
		{
			files: ['cli.ts'],
			rules: {
				'n/no-unpublished-import': 'off',
				'n/shebang': 'off',
			},
		},
	],
};
