import type { TypedFlatConfigItem } from '../types'
import { GLOB_ASTRO, GLOB_SRC, GLOB_SVELTE } from '../globs'

/**
 * Pin `parserOptions.extraFileExtensions` to a single value for every file the
 * TypeScript parser sees.
 *
 * Each framework config registers its own component extension so that
 * typescript-eslint can open those files, but the project service reloads every
 * TypeScript project whenever the value differs from the previous file. ESLint
 * lints in directory order, so a project that mixes components with plain
 * scripts would otherwise pay for a full reload at every switch, which takes
 * several seconds once many files are open.
 *
 * @see https://typescript-eslint.io/troubleshooting/typed-linting/performance/
 */
export async function extraFileExtensions(options: {
	astro: boolean
	svelte: boolean
}): Promise<TypedFlatConfigItem[]> {
	const { astro, svelte } = options
	const extensions = [...(astro ? ['.astro'] : []), ...(svelte ? ['.svelte'] : [])]

	if (extensions.length === 0) {
		return []
	}

	return [
		{
			files: [GLOB_SRC, ...(astro ? [GLOB_ASTRO] : []), ...(svelte ? [GLOB_SVELTE] : [])],
			languageOptions: {
				parserOptions: {
					extraFileExtensions: extensions,
				},
			},
			name: 'kp/extra-file-extensions',
		},
	]
}
