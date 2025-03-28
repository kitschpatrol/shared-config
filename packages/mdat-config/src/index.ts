import type { Config as MdatConfig } from 'mdat'
import { mergeConfigs } from 'mdat'
// export { commandDefinition } from './command.js'

const sharedMdatConfig: MdatConfig = {
	rules: {
		'shared-config':
			'## Project configuration\n\nThis project uses [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) to consolidate various linting and formatting tool configurations under a single dependency and the CLI command `kpi`. (ESLint, Prettier, CSpell, etc.)',
	},
}

/**
 * **\@Kitschpatrol's Shared Mdat Configuration**
 * @see [@kitschpatrol/mdat-config](https://github.com/kitschpatrol/shared-config/tree/main/packages/mdat-config)
 * @see [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config)
 * @example
 * ```ts
 *  export default mdatConfig({
 * 	rules: {
 * 		test: '**This is a test rule.**',
 * 	},
 * })
 * ```
 */
export function mdatConfig(config?: MdatConfig): MdatConfig {
	return mergeConfigs(sharedMdatConfig, config ?? {})
}

export default sharedMdatConfig
