import type { Config as MdatConfig } from 'mdat'
import { mergeConfig } from 'mdat'
// export { commandDefinition } from './command.js'

const sharedMdatConfig: MdatConfig = {
	'shared-config':
		'## Project configuration\n\nThis project uses [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config) to consolidate various linting and formatting tool configurations under a single dependency and the CLI command `ksc`. (ESLint, Prettier, CSpell, etc.)',
}

/**
 * **@Kitschpatrol's Shared Mdat Configuration**
 *
 * @example
 * 	export default mdatConfig({
 * 		test: '**This is a test rule.**',
 * 	})
 *
 * @see [@kitschpatrol/mdat-config](https://github.com/kitschpatrol/shared-config/tree/main/packages/mdat-config)
 * @see [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config)
 */
export function mdatConfig(config?: MdatConfig): MdatConfig {
	return mergeConfig(sharedMdatConfig, config ?? {})
}

export default sharedMdatConfig
