import process from 'node:process'

let originalEmit: typeof process.emit | undefined

/**
 * Silences the experimental feature warnings. Call `restoreNodeWarnings` after to restore the original behavior.
 */
export function suppressNodeWarnings(): void {
	// eslint-disable-next-line ts/unbound-method
	originalEmit ??= process.emit

	process.emit = function (...args) {
		if (args[1] instanceof Error && args[1].name === 'ExperimentalWarning') {
			return false
		}

		if (originalEmit === undefined) {
			throw new Error(
				"'suppressNodeWarnings' must be called before the first experimental warning is emitted",
			)
		}

		// @ts-expect-error - Missing types
		return originalEmit.call(this, ...args)
	} as typeof process.emit
}

/**
 * Restores the original experimental feature warning behavior of `process.emit`.
 */
export function restoreNodeWarnings(): void {
	if (originalEmit) {
		process.emit = originalEmit
		originalEmit = undefined // Clear the stored reference
	}
}
