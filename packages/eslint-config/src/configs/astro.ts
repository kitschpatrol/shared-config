import globals from 'globals'
import path from 'node:path'
import process from 'node:process'
import type {
	OptionsOverrides,
	OptionsOverridesEmbeddedScripts,
	OptionsTypeAware,
	TypedFlatConfigItem,
} from '../types'
import { GLOB_ASTRO, GLOB_ASTRO_JS, GLOB_ASTRO_TS } from '../globs'
import { tsParser } from '../parsers'
import { astroJsxA11yRecommendedRules, astroRecommendedRules } from '../presets'
import { interopDefault } from '../utilities'
import { sharedScriptConfig, sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

export async function astro(
	options: OptionsOverrides & OptionsOverridesEmbeddedScripts & OptionsTypeAware = {},
): Promise<TypedFlatConfigItem[]> {
	const {
		overrides = {},
		overridesEmbeddedScripts = {},
		typeAware = {
			enabled: true,
			ignores: [],
		},
	} = options

	// Configs that can be disabled import dependencies dynamically?
	// TODO worth it?
	const [pluginAstro, parserAstro] = await Promise.all([
		interopDefault(import('eslint-plugin-astro')),
		interopDefault(import('astro-eslint-parser')),
	] as const)

	return [
		{
			name: 'kp/astro/setup',
			plugins: {
				astro: pluginAstro,
			},
		},
		{
			// Includes plugins...
			...sharedScriptConfig,
			files: [GLOB_ASTRO],
			languageOptions: {
				globals: {
					...globals.nodeBuiltin, // TODO plugin itself uses .node in its config?
					...pluginAstro.environments.astro.globals,
				},
				parser: parserAstro,
				parserOptions: {
					extraFileExtensions: ['.astro'],
					parser: tsParser,
					...(typeAware.enabled
						? {
								// Not yet compatible with projectService
								project: path.join(process.cwd(), 'tsconfig.json'), // Not sure why this isn't inherited
							}
						: {
								project: undefined,
							}),
				},
			},
			name: 'kp/astro/rules',
			processor: 'astro/client-side-ts',
			rules: {
				...sharedScriptConfig.rules,
				...astroRecommendedRules,
				...astroJsxA11yRecommendedRules,
				// TODO right spot?
				// 'ts/no-unsafe-assignment': 'off', // Crashing
				'ts/no-unsafe-return': 'off', // Happens in templates
				// Astro components are usually PascalCase,
				// but when used as pages they are kebab-case
				'unicorn/filename-case': [
					'error',
					{
						cases: {
							kebabCase: true,
							pascalCase: true,
						},
						ignore: [String.raw`^\[slug\]\.astro$`],
					},
				],
				...overrides,
			},
		},
		typeAware.ignores.length > 0
			? {
					files: typeAware.ignores,
					languageOptions: {
						parserOptions: {
							project: undefined,
							projectService: false,
						},
					},
					name: 'kp/astro/disable-type-aware',
					rules: {
						...sharedScriptDisableTypeCheckedRules,
					},
				}
			: {},
		// Via https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/configs/flat/base.ts#L56
		{
			files: [GLOB_ASTRO_JS],
			languageOptions: {
				ecmaVersion: 2023,
				globals: {
					...globals.browser,
				},
				parser: undefined,
				sourceType: 'module',
			},
			// Define the configuration for `<script>` tag.
			// Script in `<script>` is assigned a virtual file name with the `.js` extension.
			// This is unreachable since we use `client-side-ts` processor?
			name: 'kp/astro/script-js',
			rules: {
				...sharedScriptDisableTypeCheckedRules,
				...overridesEmbeddedScripts,
			},
		},
		{
			files: [GLOB_ASTRO_TS],
			languageOptions: {
				ecmaVersion: 2023,
				globals: {
					...globals.browser,
				},
				parser: tsParser,
				// No typed rules?
				parserOptions: {
					projectService: false,
				},
				sourceType: 'module',
			},
			// Define the configuration for `<script>` tag when using `client-side-ts` processor.
			// Script in `<script>` is assigned a virtual file name with the `.ts` extension.
			name: 'kp/astro/script-ts',
			rules: {
				...sharedScriptDisableTypeCheckedRules,
				...overridesEmbeddedScripts,
			},
		},
	]
}
