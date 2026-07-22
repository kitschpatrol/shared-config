import type {
	OptionsOverrides,
	OptionsOverridesEmbeddedScripts,
	TypedFlatConfigItem,
} from '../types'
import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE } from '../globs'
import { createMarkdownConfigs } from './shared-md-mdx'

export async function md(
	options: OptionsOverrides & OptionsOverridesEmbeddedScripts = {},
): Promise<TypedFlatConfigItem[]> {
	return createMarkdownConfigs({
		...options,
		codeBlockFiles: GLOB_MARKDOWN_CODE,
		codeBlockName: 'kp/markdown/code-blocks',
		filenameRules: {
			'unicorn/filename-case': ['error', { checkDirectories: false }],
		},
		files: GLOB_MARKDOWN,
		remarkName: 'kp/markdown/remark',
	})
}
