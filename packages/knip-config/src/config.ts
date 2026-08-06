import type { KnipConfig } from 'knip'
import { deepmerge } from 'deepmerge-ts'

export type { KnipConfig } from 'knip'

/**
 * Must return a POJO to be merged into package.json
 */
export const sharedKnipConfig: KnipConfig = {
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
	// Allow calling of individual ksc binaries...
	ignoreBinaries: [
		'gh', // GitHub CLI, typically a global install...
		'ksc-cspell',
		'ksc-eslint',
		'ksc-knip',
		'ksc-mdat',
		'ksc-prettier',
		'ksc-remark',
		'ksc-repo',
		'ksc-stylelint',
		'ksc-typescript',
		'op', // 1Password CLI, typically a global install...
	],
	ignoreDependencies: [
		'@astrojs/check', // Called by @kitschpatrol/typescript-config
		'@kitschpatrol/cspell-config',
		'@kitschpatrol/dict-en-wiktionary', // Undetected due to string import in cspell.config.ts
		'@kitschpatrol/eslint-config',
		'@kitschpatrol/knip-config',
		'@kitschpatrol/mdat-config',
		'@kitschpatrol/prettier-config',
		'@kitschpatrol/remark-config',
		'@kitschpatrol/repo-config',
		'@kitschpatrol/stylelint-config',
		'@kitschpatrol/typescript-config',
		'@prettier/plugin-php',
		'@prettier/plugin-ruby',
		'@prettier/plugin-xml',
		'node-addon-api', // Sharp wants it sometimes
		'node-gyp', // Sharp wants it sometimes
		'prettier-plugin-packagejson',
		'prettier-plugin-sh',
		'prettier-plugin-tailwindcss',
		'prettier-plugin-toml',
		'remark-attribute-list', // From @kitschpatrol/prettier-plugin-astro, needed when added to tsconfig
		'remark-directive', // From @kitschpatrol/prettier-plugin-astro, needed when added to tsconfig
		'sharp',
	],
}

/**
 * **@Kitschpatrol's Shared [Knip](https://knip.dev) Configuration**
 *
 * @example
 * 	import { knipConfig } from '@kitschpatrol/knip-config'
 *
 * 	export default knipConfig({
 * 		// Customizations here
 * 	})
 *
 * @see [@kitschpatrol/knip-config](https://github.com/kitschpatrol/shared-config/tree/main/packages/knip-config)
 * @see [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config)
 */
export function knipConfig(config?: KnipConfig): KnipConfig {
	return deepmerge(sharedKnipConfig, config)
}
