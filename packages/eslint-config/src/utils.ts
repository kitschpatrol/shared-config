import process from 'node:process'
import type { Awaitable, TypedFlatConfigItem } from './types'

/**
 * Combine array and non-array configs into a single array.
 * @param configs - An array of configs or a single config.
 */
export async function combine(
	...configs: Array<Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>>
): Promise<TypedFlatConfigItem[]> {
	const resolved = await Promise.all(configs)
	return resolved.flat()
}

/**
 * Import a module dynamically and return the default export.
 * @param m - The module to import.
 */
export async function interopDefault<T>(
	m: Awaitable<T>,
): Promise<T extends { default: infer U } ? U : T> {
	const resolved = await m
	// eslint-disable-next-line ts/no-unsafe-return, ts/no-unsafe-member-access, ts/no-explicit-any
	return (resolved as any).default || resolved
}

/**
 * Determines if the code is running in an editor environment.
 *
 * This function checks various environment variables to detect if the code
 * is being executed within a code editor or IDE. It accounts for common
 * editors like VS Code, JetBrains IDEs, VIM, and Neovim.
 * @returns True if running in an editor environment, false otherwise
 */
export function isInEditorEnv(): boolean {
	// Skip editor detection if running in CI or git hooks
	if (process.env.CI) return false
	if (isInGitHooksOrLintStaged()) return false

	const editorEnvVariables = [
		process.env.VSCODE_PID,
		process.env.VSCODE_CWD,
		process.env.JETBRAINS_IDE,
		process.env.VIM,
		process.env.NVIM,
	]

	return editorEnvVariables.some(Boolean)
}

/**
 * Checks if the code is running within Git hooks or lint-staged.
 *
 * This function detects if the current execution context is within
 * Git hooks, VS Code Git operations, or lint-staged npm scripts.
 * @returns True if running in Git hooks or lint-staged, false otherwise
 */
export function isInGitHooksOrLintStaged(): boolean {
	const isLintStaged = process.env.npm_lifecycle_script?.startsWith('lint-staged')

	const gitEnvVariables = [process.env.GIT_PARAMS, process.env.VSCODE_GIT_COMMAND, isLintStaged]

	return gitEnvVariables.some(Boolean)
}

/**
 * Rename plugin names a flat configs array.
 * @param configs - The flat configs array.
 * @param map - A map of global to local plugin names.
 * @example
 * ```ts
 * import { renamePluginInConfigs } from '@kitschpatrol/eslint-config'
 * import someConfigs from './some-configs'
 *
 * export default renamePluginInConfigs(someConfigs, {
 *   '@typescript-eslint': 'ts',
 *   'import-x': 'import',
 * })
 * ```
 */
export function renamePluginInConfigs(
	configs: TypedFlatConfigItem[],
	map: Record<string, string>,
): TypedFlatConfigItem[] {
	return configs.map((i) => {
		const clone = { ...i }
		clone.rules &&= renameRules(clone.rules, map)
		clone.plugins &&= Object.fromEntries(
			Object.entries(clone.plugins).map(([key, value]) => {
				if (key in map) return [map[key], value]
				return [key, value]
			}),
		)
		return clone
	})
}

/**
 * Rename plugin prefixes in a rule object.
 * @param rules - The rules object.
 * @param map - A map of plugin prefixes to rename.
 * @example
 * ```ts
 * import { renameRules } from '@kitschpatrol/eslint-config'
 *
 * export default [{
 *   rules: renameRules(
 *     {
 *       '@typescript-eslint/indent': 'error'
 *     },
 *     { '@typescript-eslint': 'ts' }
 *   )
 * }]
 * ```
 */
export function renameRules(
	// eslint-disable-next-line ts/no-explicit-any
	rules: Record<string, any>,
	map: Record<string, string>,
): // eslint-disable-next-line ts/no-explicit-any
Record<string, any> {
	return Object.fromEntries(
		Object.entries(rules).map(([key, value]) => {
			for (const [from, to] of Object.entries(map)) {
				if (key.startsWith(`${from}/`)) return [to + key.slice(from.length), value]
			}
			return [key, value]
		}),
	)
}

/**
 * Convert a value to an array.
 * @param value - The value to convert.
 */
export function toArray<T>(value: T | T[]): T[] {
	return Array.isArray(value) ? value : [value]
}
