import type {
	OptionsOverrides,
	OptionsOverridesEmbeddedScripts,
	TypedFlatConfigItem,
} from '../types'
import {
	GLOB_AGENT_SKILL,
	GLOB_AGENT_SKILL_MARKDOWN_CODE,
	GLOB_MARKDOWN,
	GLOB_MARKDOWN_CODE,
} from '../globs'
import { createMarkdownConfigs } from './shared-md-mdx'

export async function md(
	options: OptionsOverrides & OptionsOverridesEmbeddedScripts = {},
): Promise<TypedFlatConfigItem[]> {
	return [
		...createMarkdownConfigs({
			...options,
			codeBlockFiles: GLOB_MARKDOWN_CODE,
			codeBlockName: 'kp/markdown/code-blocks',
			filenameRules: {
				'unicorn/filename-case': ['error', { checkDirectories: false }],
			},
			files: GLOB_MARKDOWN,
			remarkName: 'kp/markdown/remark',
		}),
		{
			files: [GLOB_AGENT_SKILL],
			name: 'kp/markdown/agent-skills',
			rules: {
				// The Agent Skills specification requires this exact file name
				'unicorn/filename-case': 'off',
			},
		},
		{
			files: [GLOB_AGENT_SKILL_MARKDOWN_CODE],
			name: 'kp/markdown/agent-skills-code-blocks',
			rules: {
				// Code examples in skills import from paths in the reader's project
				'import/no-unresolved': 'off',
			},
		},
	]
}
