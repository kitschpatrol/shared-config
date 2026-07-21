import type { CollectContext, CollectResult } from '../../../../src/command-builder.js'
import type { Diagnostic } from '../../../../src/diagnostics.js'
import { normalizeDiagnosticPath, toOutputLines } from '../../../../src/diagnostics.js'
import { addUnparsedFailureDiagnostic, isContinuationLine } from './shared.js'

// "src/foo.ts(12,5): error TS2304: Cannot find name 'x'."
const TSC_FILE_DIAGNOSTIC_REGEX =
	/^(?<file>.+?)\((?<line>\d+),(?<column>\d+)\): (?<severity>error|warning) (?<code>TS\d+): (?<message>.*)$/v
// "error TS5083: Cannot read file 'tsconfig.json'."
const TSC_GLOBAL_DIAGNOSTIC_REGEX = /^(?<severity>error|warning) (?<code>TS\d+): (?<message>.*)$/v

/**
 * Parses `tsc --noEmit` text output into diagnostics. Indented lines continue
 * the previous diagnostic's message.
 */
export function parseTscOutput(context: CollectContext): CollectResult {
	const diagnostics: Diagnostic[] = []
	const unparsed: string[] = []

	for (const line of toOutputLines(`${context.stdout}\n${context.stderr}`)) {
		const fileMatch = TSC_FILE_DIAGNOSTIC_REGEX.exec(line)
		if (fileMatch?.groups !== undefined) {
			const { code, column, file, line: lineNumber, message, severity } = fileMatch.groups
			diagnostics.push({
				column: Number(column),
				file: normalizeDiagnosticPath(file ?? '', context.cwd),
				line: Number(lineNumber),
				message: message ?? '',
				rule: code,
				severity: severity === 'warning' ? 'warning' : 'error',
				tool: 'tsc',
			})
			continue
		}

		const globalMatch = TSC_GLOBAL_DIAGNOSTIC_REGEX.exec(line)
		if (globalMatch?.groups !== undefined) {
			const { code, message, severity } = globalMatch.groups
			diagnostics.push({
				message: message ?? '',
				rule: code,
				severity: severity === 'warning' ? 'warning' : 'error',
				tool: 'tsc',
			})
			continue
		}

		const previousDiagnostic = diagnostics.at(-1)
		if (previousDiagnostic !== undefined && isContinuationLine(line)) {
			previousDiagnostic.message += `\n${line.trim()}`
			continue
		}

		unparsed.push(line)
	}

	return addUnparsedFailureDiagnostic(context, diagnostics, 'tsc', unparsed)
}
