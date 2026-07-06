import type { ExecaError } from 'execa'

/**
 * Returns true if the error is an ExecaError.
 */
export function isErrorExecaError(error: unknown): error is ExecaError {
	return (
		error instanceof Error &&
		'exitCode' in error &&
		typeof (error as ExecaError).exitCode === 'number'
	)
}
