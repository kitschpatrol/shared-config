import type prettier from 'prettier'
import { deepmerge } from 'deepmerge-ts'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import type { PrettierConfig } from './config.js'
import { sharedPrettierConfig } from './config.js'

/**
 * File extension or filepath hint for parser inference and config override
 * matching. Accepts a bare extension (e.g. `'md'`), a virtual filename (e.g.
 * `'file.md'`), or a full path. Known extensions supported by the default
 * shared config are offered as autocomplete suggestions.
 */
export type FileType =
	| 'astro'
	| 'bash'
	| 'css'
	| 'fish'
	| 'html'
	| 'js'
	| 'json'
	| 'jsx'
	| 'md'
	| 'mdx'
	| 'php'
	| 'rb'
	| 'sh'
	| 'svelte'
	| 'toml'
	| 'ts'
	| 'tsx'
	| 'xml'
	| 'yml'
	| 'zsh'
	| (string & {})

const PATH_CHARACTER_REGEX = /[./\\]/

/** Convert a bare extension to a virtual filepath, or pass through as-is. */
function resolveFileType(fileType: string): string {
	// If it contains a dot, slash, or backslash, treat as a filepath
	if (PATH_CHARACTER_REGEX.test(fileType)) return fileType
	return `file.${fileType}`
}

// --- Cached singletons ---

type Prettier = typeof prettier
let prettierModule: Prettier | undefined
let resolvedPluginPaths: Map<string, string> | undefined

async function getPrettier(): Promise<Prettier> {
	prettierModule ??= await import('prettier')
	return prettierModule
}

function resolvePluginPath(name: string): string {
	resolvedPluginPaths ??= new Map()

	if (!resolvedPluginPaths.has(name)) {
		try {
			resolvedPluginPaths.set(name, fileURLToPath(import.meta.resolve(name)))
		} catch {
			// Fall back to the string name; prettier will try to resolve it itself
			resolvedPluginPaths.set(name, name)
		}
	}

	return resolvedPluginPaths.get(name)!
}

// --- Plugin resolution ---

function resolvePluginsInConfig(config: PrettierConfig): PrettierConfig {
	const resolved = { ...config }

	resolved.plugins &&= resolved.plugins.map((plugin) =>
		typeof plugin === 'string' ? resolvePluginPath(plugin) : plugin,
	)

	resolved.overrides &&= resolved.overrides.map((override) => {
		if (!override.options?.plugins) return override

		return {
			...override,
			options: {
				...override.options,
				plugins: override.options.plugins.map((plugin) =>
					typeof plugin === 'string' ? resolvePluginPath(plugin) : plugin,
				),
			},
		}
	})

	return resolved
}

// --- Config resolution ---

async function resolveEffectiveConfig(
	filepath: string,
	overrides?: PrettierConfig,
): Promise<PrettierConfig> {
	const prettier = await getPrettier()
	const localConfig = await prettier.resolveConfig(filepath, { editorconfig: true })
	const baseConfig = localConfig ?? sharedPrettierConfig
	const merged = overrides ? deepmerge(baseConfig, overrides) : baseConfig
	return resolvePluginsInConfig(merged)
}

// --- Public API ---

/**
 * Format a source string using the shared Prettier configuration.
 *
 * @param source - The source code to format.
 * @param fileTypeOrConfig - A file extension (e.g. `'md'`), virtual filepath
 *   (e.g. `'file.md'`), or a `PrettierConfig` object for overrides. Defaults to
 *   `'ts'` (TypeScript parser).
 * @param config - Optional `PrettierConfig` overrides when a file type is
 *   provided as the second argument.
 *
 * @returns The formatted source string.
 */
export async function fix(
	source: string,
	fileTypeOrConfig?: FileType | PrettierConfig,
	config?: PrettierConfig,
): Promise<string> {
	let filepath = 'file.ts'
	let overrides: PrettierConfig | undefined = config

	if (typeof fileTypeOrConfig === 'string') {
		filepath = resolveFileType(fileTypeOrConfig)
	} else if (fileTypeOrConfig !== undefined) {
		overrides = fileTypeOrConfig
	}

	const effectiveConfig = await resolveEffectiveConfig(filepath, overrides)
	const prettier = await getPrettier()
	return prettier.format(source, { ...effectiveConfig, filepath })
}

/**
 * Format a file in place using the shared Prettier configuration.
 *
 * @param filePath - Path to the file to format.
 * @param config - Optional `PrettierConfig` overrides.
 */
export async function fixFile(filePath: string, config?: PrettierConfig): Promise<void> {
	const content = await fs.readFile(filePath, 'utf8')
	const effectiveConfig = await resolveEffectiveConfig(filePath, config)
	const prettier = await getPrettier()
	const formatted = await prettier.format(content, { ...effectiveConfig, filepath: filePath })
	await fs.writeFile(filePath, formatted, 'utf8')
}

/**
 * Clear the cached Prettier module and resolved plugin paths. Subsequent calls
 * to `fix` or `fixFile` will re-import Prettier and re-resolve plugins.
 */
export function clearCache(): void {
	prettierModule = undefined
	resolvedPluginPaths = undefined
}
