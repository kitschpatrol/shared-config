import * as parserMdx from 'eslint-mdx'
import * as pluginMdx from 'eslint-plugin-mdx'

import type {
	OptionsOverrides,
	OptionsOverridesEmbeddedScripts,
	TypedFlatConfigItem,
} from '../types'

import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE, GLOB_MDX } from '../globs'
import { sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

/**
 *
 */
export async function md(
	options: OptionsOverrides & OptionsOverridesEmbeddedScripts = {},
): Promise<TypedFlatConfigItem[]> {
	const { overrides = {}, overridesEmbeddedScripts = {} } = options

	const files = [GLOB_MARKDOWN]

	return [
		{
			files,
			// Need to ignore both Markdown and MDX files to successfully ignore
			// nested Markdown / MDX blocks
			ignores: [
				`${GLOB_MARKDOWN}/*.md`,
				`${GLOB_MARKDOWN}/*.mdx`,
				`${GLOB_MDX}/*.md`,
				`${GLOB_MDX}/*.mdx`,
			],
			languageOptions: {
				ecmaVersion: 'latest',
				globals: {
					// eslint-disable-next-line ts/naming-convention
					React: false,
				},
				parser: parserMdx,
				sourceType: 'module',
			},
			name: 'kp/markdown/remark',
			plugins: {
				mdx: pluginMdx,
			},
			// ignores: [GLOB_MARKDOWN_IN_MARKDOWN, GLOB_MARKDOWN_IN_MDX],
			processor: pluginMdx.createRemarkProcessor({
				// Lints code in the next passs
				lintCodeBlocks: true,
			}),
			// These apply to the remark-lint pass only!
			rules: {
				// eslint-disable-next-line ts/naming-convention
				'mdx/remark': 'warn',
				'react/react-in-jsx-scope': 0,
				...overrides,
			},
		},
		{
			files: [GLOB_MARKDOWN_CODE],
			languageOptions: {
				parserOptions: {
					projectService: false,
				},
			},
			name: 'kp/markdown/code-blocks',
			rules: {
				...sharedScriptDisableTypeCheckedRules,
				// TODO revisit
				// 'antfu/no-top-level-await': 'off',
				// 'import/newline-after-import': 'off',
				// 'no-alert': 'off',
				// 'no-console': 'off',
				// 'no-labels': 'off',
				// 'no-lone-blocks': 'off',
				// 'no-restricted-syntax': 'off',
				// 'no-undef': 'off',
				// 'no-unused-expressions': 'off',
				// 'no-unused-labels': 'off',
				'no-unused-vars': 'off',
				// 'node/prefer-global/process': 'off',
				// 'style/comma-dangle': 'off',
				// 'style/eol-last': 'off',
				// 'ts/consistent-type-imports': 'off',
				// 'ts/explicit-function-return-type': 'off',
				// 'ts/no-namespace': 'off',
				// 'ts/no-redeclare': 'off',
				// 'ts/no-require-imports': 'off',
				// 'ts/no-unused-expressions': 'off',
				'ts/no-unused-vars': 'off',
				// 'ts/no-use-before-define': 'off',
				// 'unicode-bom': 'off',
				// 'unused-imports/no-unused-imports': 'off',
				'unicorn/filename-case': 'off',
				'unused-imports/no-unused-vars': 'off',
				...overridesEmbeddedScripts,
			},
		},
	]
}
