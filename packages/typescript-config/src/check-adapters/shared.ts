import type { CollectContext, CollectResult } from '../../../../src/command-builder.js'
import type { Diagnostic } from '../../../../src/diagnostics.js'

const CONTINUATION_LINE_REGEX = /^\s/v
const FAILURE_INDICATOR_REGEX = /\berror\b|\bfailed\b|\bfailure\b/iv

/**
 * A checker process must never fail while contributing zero errors merely
 * because its output changed. Preserve the original line as unparsed output and
 * add a project-level fallback diagnostic.
 */
export function addUnparsedFailureDiagnostic(
	context: CollectContext,
	diagnostics: Diagnostic[],
	tool: string,
	unparsed: string[],
): CollectResult {
	if (context.exitCode !== 0 && diagnostics.every(({ severity }) => severity !== 'error')) {
		diagnostics.push({
			message:
				unparsed.find((line) => FAILURE_INDICATOR_REGEX.test(line)) ??
				`${tool} exited with code ${context.exitCode} without a parseable error.`,
			severity: 'error',
			tool,
		})
	}

	return { diagnostics, unparsed }
}

/** True when a checker output line continues the previous diagnostic. */
export function isContinuationLine(line: string): boolean {
	return CONTINUATION_LINE_REGEX.test(line)
}

/** Narrow an unknown JSON value to a string-keyed object. */
export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}

/** Parse a JSON-encoded string without throwing on malformed checker output. */
export function parseJsonString(value: string): string | undefined {
	try {
		const parsed: unknown = JSON.parse(value)
		return typeof parsed === 'string' ? parsed : undefined
	} catch {
		return undefined
	}
}
