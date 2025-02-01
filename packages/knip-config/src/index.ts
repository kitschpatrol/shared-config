import type { KnipConfig } from 'knip'

const sharedKnipConfig: KnipConfig = {
	ignoreBinaries: ['ksdiff', 'mdat'],
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
	// TODO real merge?
	return {
		...sharedKnipConfig,
		...config,
	}
}

export default sharedKnipConfig
