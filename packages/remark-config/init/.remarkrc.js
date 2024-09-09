import sharedConfig, { overrideRules } from '@envsa/remark-config'

const localConfig = {
	...sharedConfig,
	// Overrides are a special case, working as below (set `false` as the second element to disable):
	// plugins: overrideRules(sharedConfig.plugins, [
	// 	['remark-lint-first-heading-level', 2],
	// 	['remarkValidateLinks', { repository: false }],
	// ]),
}

export default localConfig
