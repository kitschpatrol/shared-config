import sharedConfig from '@kitschpatrol/prettier-config'

/** @type {import("prettier").Config} */
const localConfig = {
	// Config overrides
	// overrides: [
	// 	...sharedConfig.overrides,
	// 	{
	// 		// Per-file overrides
	// 	},
	// ],
}
export default {
	...sharedConfig,
	...localConfig,
}
