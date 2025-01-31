import { eslintConfig } from '@kitschpatrol/eslint-config'

export default eslintConfig(
	{
		astro: true,
		react: true,
		svelte: true,
		type: 'lib',
	},
	{
		rules: {
			'depend/ban-dependencies': [
				'error',
				{
					allowed: ['fs-extra', 'execa'],
				},
			],
		},
	},
	{
		files: ['packages/eslint-config/src/presets/**.*'],
		rules: {
			// Don't sort generated preset rules
			'perfectionist/sort-objects': 'off',
			'ts/naming-convention': 'off',
			'unicorn/no-null': 'off',
		},
	},
)

// TODO ignore
// bin/
// /test/fixtures/input
// /test/fixtures/output-fixable
