import type { KnipConfig } from 'knip'
import { deepmerge } from 'deepmerge-ts'

const sharedKnipConfig: KnipConfig = {
	entry: [
		'scripts/**/*.ts',
		'.remarkrc.js',
		'cspell.config.js',
		'eslint.config.ts',
		'mdat.config.ts',
		'prettier.config.js',
		'stylelint.config.js',
	],
}

/**
 * **\@Kitschpatrol's Shared Knip Configuration**
 * @see [@kitschpatrol/knip-config](https://github.com/kitschpatrol/shared-config/tree/main/packages/knip-config)
 * @see [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config)
 * @example
 * ```ts
 * import { knipConfig } from '@kitschpatrol/knip-config'
 *
 * export default knipConfig({
 *   // Customizations here
 * })
 * ```
 */
export function knipConfig(config?: KnipConfig): KnipConfig {
	return deepmerge(sharedKnipConfig, config)
}

export default sharedKnipConfig
