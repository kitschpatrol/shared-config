import * as parserMdx from 'eslint-mdx'
import * as pluginMdx from 'eslint-plugin-mdx'
import type {
	OptionsOverrides,
	OptionsOverridesEmbeddedScripts,
	TypedFlatConfigItem,
} from '../types'
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE, GLOB_MDX } from '../globs'
import { sharedScriptConfig, sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

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
				...sharedScriptConfig.plugins,
				mdx: pluginMdx,
			},
			// ignores: [GLOB_MARKDOWN_IN_MARKDOWN, GLOB_MARKDOWN_IN_MDX],
			processor: pluginMdx.createRemarkProcessor({
				// Lints code in the next pass
				lintCodeBlocks: true,
			}),
			// These apply to the remark-lint pass only!
			rules: {
				// TODO there's some issue accessing the recommended config:
				// "Error: Could not find ESLint Linter in require cache"
				'mdx/remark': 'warn',
				'react/react-in-jsx-scope': 0,
				'unicorn/filename-case': 'error', // No shouting
				...overrides,
			},
		},
		{
			// Includes plugins...
			...sharedScriptConfig,
			files: [GLOB_MARKDOWN_CODE],
			languageOptions: {
				parserOptions: {
					projectService: false,
				},
			},
			name: 'kp/markdown/code-blocks',
			rules: {
				...sharedScriptDisableTypeCheckedRules,
				'no-unused-expressions': 'off',
				'no-unused-vars': 'off',
				'ts/no-unused-expressions': 'off',
				'ts/no-unused-vars': 'off',
				'unicorn/filename-case': 'off', // Don't enforce on internal code block file names
				// TODO revisit
				// 'import/newline-after-import': 'off',
				// 'no-alert': 'off',
				// 'no-console': 'off',
				// 'no-labels': 'off',
				// 'no-lone-blocks': 'off',
				// 'no-restricted-syntax': 'off',
				// 'no-undef': 'off',
				// 'no-unused-labels': 'off',
				// 'node/prefer-global/process': 'off',
				// 'style/comma-dangle': 'off',
				// 'style/eol-last': 'off',
				// 'ts/consistent-type-imports': 'off',
				// 'ts/explicit-function-return-type': 'off',
				// 'ts/no-namespace': 'off',
				// 'ts/no-redeclare': 'off',
				// 'ts/no-require-imports': 'off',
				// 'ts/no-unused-expressions': 'off',
				// 'ts/no-use-before-define': 'off',
				// 'unicode-bom': 'off',
				...overridesEmbeddedScripts,
			},
		},
	]
}
