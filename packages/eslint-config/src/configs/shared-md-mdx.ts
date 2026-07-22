import * as pluginMdx from 'eslint-plugin-mdx'
import type {
	OptionsOverrides,
	OptionsOverridesEmbeddedScripts,
	Rules,
	TypedFlatConfigItem,
} from '../types'
import { GLOB_MARKDOWN, GLOB_MDX } from '../globs'
import { tsParser } from '../parsers'
import { mdxCodeBlocksRules, mdxRecommendedRules } from '../presets'
import { sharedScriptConfig, sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

type MarkdownConfigOptions = OptionsOverrides &
	OptionsOverridesEmbeddedScripts & {
		codeBlockFiles: string
		codeBlockName: string
		filenameRules: Rules
		files: string
		remarkName: string
	}

const nestedMarkdownFiles = [
	`${GLOB_MARKDOWN}/*.md`,
	`${GLOB_MARKDOWN}/*.mdx`,
	`${GLOB_MDX}/*.md`,
	`${GLOB_MDX}/*.mdx`,
]

export function createMarkdownConfigs(options: MarkdownConfigOptions): TypedFlatConfigItem[] {
	const {
		codeBlockFiles,
		codeBlockName,
		filenameRules,
		files,
		overrides = {},
		overridesEmbeddedScripts = {},
		remarkName,
	} = options

	return [
		{
			files: [files],
			// Nested Markdown and MDX blocks are linted as virtual files in the
			// code-block pass, not recursively as documents.
			ignores: nestedMarkdownFiles,
			languageOptions: {
				...pluginMdx.flat.languageOptions,
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			name: remarkName,
			plugins: {
				...sharedScriptConfig.plugins,
				mdx: pluginMdx,
			},
			processor: pluginMdx.createRemarkProcessor({
				lintCodeBlocks: true,
			}),
			rules: {
				...mdxRecommendedRules,
				...filenameRules,
				...overrides,
			},
		},
		{
			...sharedScriptConfig,
			files: [codeBlockFiles],
			languageOptions: {
				parser: tsParser,
				parserOptions: {
					ecmaFeatures: {
						impliedStrict: true,
					},
					projectService: false,
				},
			},
			name: codeBlockName,
			rules: {
				...sharedScriptConfig.rules,
				...sharedScriptDisableTypeCheckedRules,
				...mdxCodeBlocksRules,
				'jsdoc/require-param-description': 'off',
				'jsdoc/require-returns': 'off',
				'ts/no-unused-expressions': 'off',
				'unicorn/filename-case': 'off',
				...overridesEmbeddedScripts,
			},
		},
	]
}
