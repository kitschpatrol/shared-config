import type { Rules } from '../types'

export const mdxRecommendedRules: Rules = {
	// Begin expansion 'eslint-plugin-mdx' 'flat.rules' 'exclude: react/'
	'mdx/remark': 'warn',
	'no-unused-expressions': 'error',
	// End expansion
}

export const mdxCodeBlocksRules: Rules = {
	// Begin expansion 'eslint-plugin-mdx' 'flatCodeBlocks.rules'
	'eol-last': 'off',
	'no-undef': 'off',
	'no-unused-expressions': 'off',
	'no-unused-vars': 'off',
	'ts/no-unused-vars': 'off',
	'padded-blocks': 'off',
	strict: 'off',
	'unicode-bom': 'off',
	// End expansion
}
