/* eslint-disable ts/no-unnecessary-type-parameters */
import type { Linter } from 'eslint'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { getTsconfig } from 'get-tsconfig'
import globals from 'globals'
import { isPackageExists } from 'local-pkg'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import type { RuleOptions } from './typegen'
import type { Awaitable, ConfigNames, OptionsConfig, TypedFlatConfigItem } from './types'
import {
	astro,
	disables,
	html,
	ignores,
	js,
	json,
	jsx,
	md,
	mdx,
	react,
	svelte,
	test,
	toml,
	ts,
	tsx,
	yaml,
} from './configs'
import { tsParser } from './parsers'
import { interopDefault, isInEditorEnv as isInEditorEnvironment } from './utilities'

const flatConfigProperties = [
	'name',
	'languageOptions',
	'linterOptions',
	'processor',
	'plugins',
	'rules',
	'settings',
] satisfies Array<keyof TypedFlatConfigItem>

// Order matters
/* eslint-disable perfectionist/sort-objects */
export const defaultPluginRenaming = {
	'@eslint-community/eslint-comments': 'eslint-comments',
	'@eslint-react': 'react',
	jsonc: 'json',
	'@html-eslint': 'html',
	'package-json': 'json-package',
	'@typescript-eslint': 'ts',
	'@stylistic-eslint': 'stylistic',
	'import-x': 'import',
	n: 'node',
	vitest: 'test',
	yml: 'yaml',
}
/* eslint-enable perfectionist/sort-objects */

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>

type TypeAwareConfigKey = 'astro' | 'js' | 'jsx' | 'react' | 'svelte' | 'ts' | 'tsx'
const ESLINT_CONFIG_FILENAME_REGEX = /^eslint\.config\.[cm]?[jt]s$/v

/**
 * **@Kitschpatrol's Shared [ESLint](https://eslint.org/) Configuration***
 *
 * @example
 * 	import { eslintConfig } from '@kitschpatrol/eslint-config'
 *
 * 	export default eslintConfig(
 * 		{
 * 			// Option customizations here
 * 		},
 * 		{
 * 			// Additional flat config objects here
 * 		},
 * 	)
 *
 * @param options The options for generating the ESLint configurations.
 * @param userConfigs The user configurations to be merged with the generated
 *   configurations.
 * @see [@kitschpatrol/eslint-config](https://github.com/kitschpatrol/shared-config/tree/main/packages/eslint-config)
 * @see [@kitschpatrol/shared-config](https://github.com/kitschpatrol/shared-config)*
 */
export async function eslintConfig(
	options: Omit<TypedFlatConfigItem, 'files'> & OptionsConfig = {},
	...userConfigs: Array<
		Awaitable<
			// eslint-disable-next-line ts/no-explicit-any
			FlatConfigComposer<any, any> | Linter.Config[] | TypedFlatConfigItem | TypedFlatConfigItem[]
		>
	>
): Promise<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>> {
	const {
		astro: enableAstro = isPackageExists('astro'),
		gitignore: enableGitignore = true,
		react: enableReact = isPackageExists('react'),
		svelte: enableSvelte = isPackageExists('svelte'),
	} = options
	const eslintConfigRootDirectory = path.resolve(
		options.tsconfigRootDirectory ?? getEslintConfigRootDirectoryFromStack() ?? process.cwd(),
	)
	const tsconfig = getTsconfig(eslintConfigRootDirectory)
	const tsconfigRootDirectory =
		tsconfig === null ? eslintConfigRootDirectory : path.dirname(tsconfig.path)
	const isTypeAwareTypeScript = tsconfig !== null
	const isTypeAwareJavaScript =
		isTypeAwareTypeScript && tsconfig.config.compilerOptions?.checkJs === true

	let { isInEditor } = options
	if (isInEditor === undefined) {
		isInEditor = isInEditorEnvironment()
		if (isInEditor) {
			console.log(
				'[@kitschpatrol/eslint-config] Detected running in editor, some rules are disabled.',
			)
		}
	}

	const configs: Array<Awaitable<TypedFlatConfigItem[]>> = []

	if (enableGitignore !== false) {
		configs.push(
			gitignoreConfig(
				typeof enableGitignore === 'boolean'
					? { name: 'kp/gitignore', strict: false }
					: { name: 'kp/gitignore', ...enableGitignore },
			),
		)
	}

	// Base configs
	configs.push(
		ignores(options.ignores),
		[
			{
				linterOptions: {
					reportUnusedDisableDirectives: 'error',
				},
			},
		],
		js({
			...resolveSubOptions(options, 'js'),
			overrides: getOverrides(options, 'js'),
			tsconfigRootDirectory,
			typeAware: resolveTypeAwareOptions(options, 'js', isTypeAwareJavaScript),
		}),
		jsx({
			...resolveSubOptions(options, 'jsx'),
			overrides: getOverrides(options, 'jsx'),
			tsconfigRootDirectory,
			typeAware: resolveTypeAwareOptions(options, 'jsx', isTypeAwareJavaScript),
		}),
		ts({
			...resolveSubOptions(options, 'ts'),
			overrides: getOverrides(options, 'ts'),
			tsconfigRootDirectory,
			typeAware: resolveTypeAwareOptions(options, 'ts', isTypeAwareTypeScript),
		}),
		tsx({
			...resolveSubOptions(options, 'tsx'),
			overrides: getOverrides(options, 'tsx'),
			tsconfigRootDirectory,
			typeAware: resolveTypeAwareOptions(options, 'tsx', isTypeAwareTypeScript),
		}),
		test({
			isInEditor,
			overrides: getOverrides(options, 'test'),
		}),
		json({
			overrides: getOverrides(options, 'json'),
		}),
		yaml({
			overrides: getOverrides(options, 'yaml'),
		}),
		toml({
			overrides: getOverrides(options, 'toml'),
		}),
		md({
			overrides: getOverrides(options, 'md'),
			overridesEmbeddedScripts: getOverridesEmbeddedScripts(options, 'md'),
		}),
		mdx({
			overrides: getOverrides(options, 'mdx'),
			overridesEmbeddedScripts: getOverridesEmbeddedScripts(options, 'mdx'),
		}),
		html({
			overrides: getOverrides(options, 'html'),
			overridesEmbeddedScripts: getOverridesEmbeddedScripts(options, 'html'),
		}),
	)

	// Frameworks

	if (enableReact !== false) {
		configs.push(
			react({
				...resolveSubOptions(options, 'react'),
				overrides: getOverrides(options, 'react'),
				tsconfigRootDirectory,
				typeAware: resolveTypeAwareOptions(options, 'react', isTypeAwareTypeScript),
				typeAwareJavaScript: resolveTypeAwareEnabled(options, 'react', isTypeAwareJavaScript),
			}),
		)
	}

	if (enableSvelte !== false) {
		configs.push(
			svelte({
				...resolveSubOptions(options, 'svelte'),
				overrides: getOverrides(options, 'svelte'),
				tsconfigRootDirectory,
				typeAware: resolveTypeAwareOptions(options, 'svelte', isTypeAwareTypeScript),
				typeAwareJavaScript: resolveTypeAwareEnabled(options, 'svelte', isTypeAwareJavaScript),
			}),
		)
	}

	if (enableAstro !== false) {
		configs.push(
			astro({
				...resolveSubOptions(options, 'astro'),
				overrides: getOverrides(options, 'astro'),
				overridesEmbeddedScripts: getOverridesEmbeddedScripts(options, 'astro'),
				tsconfigRootDirectory,
				typeAware: resolveTypeAwareOptions(options, 'astro', isTypeAwareTypeScript),
			}),
		)
	}

	configs.push(disables())

	if ('files' in options) {
		throw new Error(
			'[@kitschpatrol/eslint-config] The first argument should not contain the "files" property as the options are supposed to be global. Place it in the second or later config instead.',
		)
	}

	// User can optionally pass a flat config item to the first argument
	// We pick the known keys as ESLint would do schema validation
	// eslint-disable-next-line unicorn/no-array-reduce
	const fusedConfig = flatConfigProperties.reduce<TypedFlatConfigItem>((accumulator, key) => {
		if (Object.hasOwn(options, key)) {
			// eslint-disable-next-line ts/no-unsafe-assignment, ts/no-explicit-any
			accumulator[key] = options[key] as any
		}

		return accumulator
	}, {})
	if (Object.keys(fusedConfig).length > 0) {
		configs.push([fusedConfig])
	}

	let composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>()

	// Console.log('----------------------------------')
	// Resolve all configs and get all plugins

	// let plugins: Linter.Config['plugins'] = {}
	// for (const config of await Promise.all(configs)) {
	// 	for (const configItem of config) {
	// 		if (configItem.plugins !== undefined && configItem.plugins.length > 0) {
	// 			console.log(configItem.plugins)
	// 			plugins = { ...plugins, ...configItem.plugins }
	// 		}
	// 	}
	// }

	// console.log('----------------------------------')

	// console.log(plugins)

	// eslint-disable-next-line ts/no-unsafe-argument, ts/no-explicit-any
	composer = composer.append(...configs, ...(userConfigs as any))

	composer = composer.renamePlugins(defaultPluginRenaming)

	// Console.log('----------------------------------')
	// composer.toConfigs().then((configs) => {
	// 	console.log(configs)
	// })

	return composer
}

/**
 * Load the gitignore-based ignores config.
 *
 * @param options - Options passed to `eslint-config-flat-gitignore`.
 */
async function gitignoreConfig(options: FlatGitignoreOptions): Promise<TypedFlatConfigItem[]> {
	const configureGitignore = await interopDefault(import('eslint-config-flat-gitignore'))
	return [configureGitignore(options)]
}

/**
 * Get ESLint language options object.
 *
 * @param typeAware - Whether to enable type-aware linting.
 * @param isJsxEnabled - Whether to enable JSX parsing.
 * @param tsconfigRootDirectory - Root directory for TypeScript project lookup.
 */
export function getLanguageOptions(
	typeAware = true,
	isJsxEnabled = false,
	tsconfigRootDirectory?: string,
): Linter.LanguageOptions {
	return {
		ecmaVersion: 2023,
		globals: {
			...globals.browser,
			...globals.es2023,
			...globals.nodeBuiltin,
		},
		parser: tsParser,
		parserOptions: {
			ecmaFeatures: {
				impliedStrict: true,
				jsx: isJsxEnabled,
			},
			...(typeAware
				? {
						projectService: true,
						...(tsconfigRootDirectory !== undefined && {
							tsconfigRootDir: tsconfigRootDirectory,
						}),
					}
				: {
						projectService: false,
					}),
			ecmaVersion: 2023,
			sourceType: 'module',
		},
	}
}

/** Infer the directory of the active ESLint flat config from the call stack. */
function getEslintConfigRootDirectoryFromStack(): string | undefined {
	// The structured stack trace API is implemented by the supported Node runtimes.
	/* eslint-disable unicorn/no-nonstandard-builtin-properties */
	// eslint-disable-next-line ts/unbound-method
	const originalPrepareStackTrace = Error.prepareStackTrace
	const originalStackTraceLimit = Error.stackTraceLimit

	try {
		Error.stackTraceLimit = Infinity
		Error.prepareStackTrace = (_error, structuredStackTrace) => structuredStackTrace

		const stackContainer: { stack?: NodeJS.CallSite[] } = {}
		Error.captureStackTrace(stackContainer, getEslintConfigRootDirectoryFromStack)

		const structuredStack = stackContainer.stack ?? []
		for (const callSite of structuredStack) {
			const filePathOrUrl = callSite.getFileName()
			if (filePathOrUrl === null) {
				continue
			}

			const filePath = filePathOrUrl.startsWith('file://')
				? fileURLToPath(filePathOrUrl)
				: filePathOrUrl
			const parsedPath = path.parse(filePath)

			if (ESLINT_CONFIG_FILENAME_REGEX.test(parsedPath.base)) {
				return parsedPath.dir
			}
		}
	} finally {
		Error.prepareStackTrace = originalPrepareStackTrace
		Error.stackTraceLimit = originalStackTraceLimit
	}
	/* eslint-enable unicorn/no-nonstandard-builtin-properties */

	return undefined
}

/** Resolve auto-detection and user overrides for a type-aware config. */
function resolveTypeAwareOptions(
	options: OptionsConfig,
	key: TypeAwareConfigKey,
	autoEnabled: boolean,
): { enabled: boolean; ignores: string[] } {
	const subOptions = resolveSubOptions(options, key)
	return {
		enabled: subOptions.typeAware?.enabled ?? autoEnabled,
		ignores: subOptions.typeAware?.ignores ?? [],
	}
}

/** Resolve only the enabled state for a second language in a framework config. */
function resolveTypeAwareEnabled(
	options: OptionsConfig,
	key: 'react' | 'svelte',
	autoEnabled: boolean,
): boolean {
	return resolveSubOptions(options, key).typeAware?.enabled ?? autoEnabled
}

/**
 * Get the overrides for a specific key.
 *
 * @param options The options object.
 * @param key The key to get the overrides for.
 */
export function getOverrides<K extends keyof OptionsConfig>(
	options: OptionsConfig,
	key: K,
): Partial<Linter.RulesRecord & RuleOptions> {
	const sub = resolveSubOptions(options, key)
	return {
		...('overrides' in sub && sub.overrides),
	}
}

/**
 * Get the overrides for embedded scripts for a specific key.
 *
 * @param options The options object.
 * @param key The key to get the overrides for.
 */
export function getOverridesEmbeddedScripts<K extends keyof OptionsConfig>(
	options: OptionsConfig,
	key: K,
): Partial<Linter.RulesRecord & RuleOptions> {
	const sub = resolveSubOptions(options, key)
	return {
		...('overridesEmbeddedScripts' in sub && sub.overridesEmbeddedScripts),
	}
}

/**
 * Construct an array of ESLint flat config items.
 *
 * @param options The options for generating the ESLint configurations.
 * @param userConfigs The user configurations to be merged with the generated
 *   configurations.
 *
 * @returns The merged ESLint configurations.
 */

/**
 * Resolve the sub options for a specific key.
 *
 * @param options The options object.
 * @param key The key to resolve the sub options for.
 */
export function resolveSubOptions<K extends keyof OptionsConfig>(
	options: OptionsConfig,
	key: K,
): ResolvedOptions<OptionsConfig[K]> {
	// eslint-disable-next-line ts/no-unsafe-return, ts/no-explicit-any
	return typeof options[key] === 'boolean' ? ({} as any) : (options[key] ?? ({} as any))
}
