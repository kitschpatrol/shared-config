import type { ExecaError } from 'execa'

/**
 * Returns true if the error is an ExecaError.
 */
export function isErrorExecaError(error: unknown): error is ExecaError {
	return (
		error instanceof Error &&
		'exitCode' in error &&
		// eslint-disable-next-line ts/no-unsafe-type-assertion
		typeof (error as ExecaError).exitCode === 'number'
	)
}
