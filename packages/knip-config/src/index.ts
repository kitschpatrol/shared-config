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
		'scripts/**/*.{js,mjs,cjs,ts,mts,cts}',
		'.remarkrc.{js,mjs,cjs,ts,mts,cts}',
		'cspell.config.{js,mjs,cjs,ts,mts,cts}',
		'eslint.config.{js,mjs,cjs,ts,mts,cts}',
		'mdat.config.{js,mjs,cjs,ts,mts,cts}',
		'prettier.config.{js,mjs,cjs,ts,mts,cts}',
		'stylelint.config.{js,mjs,cjs,ts,mts,cts}',
	],
	// Allow calling of individual kpi binaries...
	ignoreBinaries: [
		'kpi-repo',
		'kpi-mdat',
		'kpi-typescript',
		'kpi-eslint',
		'kpi-stylelint',
		'kpi-cspell',
		'kpi-knip',
		'kpi-remark',
		'kpi-prettier',
		// 1Password CLI, typically a global install...
		'op',
		// GitHub CLI, typically a global install...
		'gh',
	],
	ignoreDependencies: [
		'@kitschpatrol/cspell-config',
		'@kitschpatrol/eslint-config',
		'@kitschpatrol/knip-config',
		'@kitschpatrol/mdat-config',
		'@kitschpatrol/prettier-config',
		'@kitschpatrol/remark-config',
		'@kitschpatrol/stylelint-config',
		'@prettier/plugin-php',
		'@prettier/plugin-ruby',
		'@prettier/plugin-xml',
		'prettier-plugin-packagejson',
		'prettier-plugin-sh',
		'prettier-plugin-sql',
		'prettier-plugin-tailwindcss',
		'prettier-plugin-toml',
		// Undetected due to string import in cspell.config.js
		'@kitschpatrol/dict-en-wiktionary',
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
