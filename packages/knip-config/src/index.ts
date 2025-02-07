import type { KnipConfig } from 'knip'
import { deepmerge } from 'deepmerge-ts'
// export { commandDefinition } from './command.js'

/**
 * Must return a POJO to be merged into package.json
 */
const sharedKnipConfig: KnipConfig = {
	entry: [
		// Default entry... not merging in from default Knip config?
		'{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!',
		'src/{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!',

		// Customized entries
		'src/{bin,lib,cli}/{index,cli,main}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}!',
		'scripts/**/*.ts',
		'.remarkrc.js',
		'cspell.config.js',
		'eslint.config.ts',
		'mdat.config.ts',
		'prettier.config.js',
		'stylelint.config.js',
	],
	ignoreDependencies: [
		'@kitschpatrol/cspell-config',
		'@kitschpatrol/eslint-config',
		'@kitschpatrol/knip-config',
		'@kitschpatrol/mdat-config',
		'@kitschpatrol/prettier-config',
		'@kitschpatrol/remark-config',
		'@kitschpatrol/stylelint-config',
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
