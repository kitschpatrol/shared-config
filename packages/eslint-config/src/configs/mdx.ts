import type {
	OptionsOverrides,
	OptionsOverridesEmbeddedScripts,
	TypedFlatConfigItem,
} from '../types'
import { GLOB_MDX, GLOB_MDX_CODE } from '../globs'
import { createMarkdownConfigs } from './shared-md-mdx'

export async function mdx(
	options: OptionsOverrides & OptionsOverridesEmbeddedScripts = {},
): Promise<TypedFlatConfigItem[]> {
	return createMarkdownConfigs({
		...options,
		codeBlockFiles: GLOB_MDX_CODE,
		codeBlockName: 'kp/mdx/code-blocks',
		filenameRules: {
			// MDX files may be content or components.
			'unicorn/filename-case': [
				'error',
				{
					cases: {
						kebabCase: true,
						pascalCase: true,
					},
					checkDirectories: false,
				},
			],
		},
		files: GLOB_MDX,
		remarkName: 'kp/mdx/remark',
	})
}
