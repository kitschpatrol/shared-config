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
)

// TODO ignore
// bin/
// /test/fixtures/input
// /test/fixtures/output-fixable
