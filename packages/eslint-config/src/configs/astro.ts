import globals from 'globals'
import type {
	OptionsOverrides,
	OptionsOverridesEmbeddedScripts,
	OptionsTsconfigRootDirectory,
	OptionsTypeAware,
	TypedFlatConfigItem,
} from '../types'
import { GLOB_ASTRO, GLOB_ASTRO_TS } from '../globs'
import { tsParser } from '../parsers'
import { astroJsxA11yRecommendedRules, astroRecommendedRules } from '../presets'
import { interopDefault } from '../utilities'
import { sharedScriptConfig, sharedScriptDisableTypeCheckedRules } from './shared-js-ts'

export async function astro(
	options: OptionsOverrides &
		OptionsOverridesEmbeddedScripts &
		OptionsTsconfigRootDirectory &
		OptionsTypeAware = {},
): Promise<TypedFlatConfigItem[]> {
	const { overrides = {}, overridesEmbeddedScripts = {}, tsconfigRootDirectory } = options
	const { enabled = true, ignores = [] } = options.typeAware ?? {}

	// Keep the framework parser and plugin out of the startup path unless Astro is enabled.
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
			...sharedScriptConfig,
			files: [GLOB_ASTRO],
			languageOptions: {
				globals: {
					...globals.node,
					...pluginAstro.environments.astro.globals,
				},
				parser: parserAstro,
				parserOptions: {
					extraFileExtensions: ['.astro'],
					parser: tsParser,
					...(enabled
						? {
								// Astro's ESLint parser uses `project: true`; it cannot consume project services.
								project: true,
								projectService: undefined,
								...(tsconfigRootDirectory !== undefined && {
									tsconfigRootDir: tsconfigRootDirectory,
								}),
							}
						: {
								project: undefined,
								projectService: false,
							}),
				},
				sourceType: 'module',
			},
			name: 'kp/astro/component',
			processor: 'astro/client-side-ts',
			rules: {
				...sharedScriptConfig.rules,
				...(!enabled && sharedScriptDisableTypeCheckedRules),
				'perfectionist/sort-intersection-types': [
					'error',
					{
						groups: [
							'named',
							'union',
							'intersection',
							'conditional',
							'function',
							'import',
							'keyword',
							'operator',
							'literal',
							'tuple',
							'object', // Must be last, otherwise esbuild will choke on `&` characters
						],
					},
				],
			},
		},
		{
			files: [GLOB_ASTRO],
			name: 'kp/astro/rules',
			rules: {
				...astroRecommendedRules,
				...astroJsxA11yRecommendedRules,
				// Astro components are usually PascalCase, while pages may be kebab-case.
				'unicorn/filename-case': [
					'error',
					{
						cases: {
							kebabCase: true,
							pascalCase: true,
						},
						checkDirectories: false,
						ignore: [String.raw`^\[slug\]\.astro$`],
					},
				],
				...overrides,
			},
		},
		enabled && ignores.length > 0
			? {
					files: ignores,
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
		{
			// `client-side-ts` emits every client script with a virtual `.ts` filename.
			...sharedScriptConfig,
			files: [GLOB_ASTRO_TS],
			languageOptions: {
				ecmaVersion: 'latest',
				globals: {
					...globals.browser,
				},
				parser: tsParser,
				parserOptions: {
					project: null,
					projectService: false,
				},
				sourceType: 'module',
			},
			name: 'kp/astro/script-ts',
			rules: {
				...sharedScriptConfig.rules,
				...sharedScriptDisableTypeCheckedRules,
				'unicorn/filename-case': 'off',
				...overridesEmbeddedScripts,
			},
		},
	]
}
