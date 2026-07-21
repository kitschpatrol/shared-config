import type { CollectContext, CollectResult } from '../../../../src/command-builder.js'
import type { Diagnostic } from '../../../../src/diagnostics.js'
import { normalizeDiagnosticPath, toOutputLines } from '../../../../src/diagnostics.js'
import { addUnparsedFailureDiagnostic, isRecord, parseJsonString } from './shared.js'

// Human format: progress lines and the all-clear summary. Passing `--output
// human` would also drop the progress lines, but strips code context from real
// diagnostics, so native mode filters only known chrome instead.
const SVELTE_CHECK_HUMAN_NOISE_REGEX =
	/^(?:Loading svelte-check in workspace: |Getting Svelte diagnostics\.\.\.|svelte-check found 0 errors and 0 warnings$)/v

// Machine format, which svelte-check also selects itself when CLAUDECODE=1.
// See https://github.com/sveltejs/language-tools/issues/2868
const SVELTE_CHECK_MACHINE_NOISE_REGEX =
	/^\d+ (?:START "|COMPLETED \d+ FILES 0 ERRORS 0 WARNINGS 0 FILES_WITH_PROBLEMS$)/v
const SVELTE_CHECK_MACHINE_CHROME_REGEX =
	/^\d+ (?:START "|COMPLETED \d+ FILES \d+ ERRORS \d+ WARNINGS \d+ FILES_WITH_PROBLEMS$)/v
const SVELTE_CHECK_MACHINE_DIAGNOSTIC_REGEX =
	/^\d+ (?<severity>ERROR|WARNING) (?<file>"(?:\\.|[^"\\])*") (?<line>\d+):(?<column>\d+) (?<message>"(?:\\.|[^"\\])*")$/v
const SVELTE_CHECK_MACHINE_FAILURE_REGEX = /^\d+ FAILURE (?<message>.+)$/v
const TIMESTAMPED_JSON_REGEX = /^\d+\s/v

function toRule(source: unknown, code: unknown): string | undefined {
	const sourceString = typeof source === 'string' && source.length > 0 ? source : undefined
	const codeString = typeof code === 'string' || typeof code === 'number' ? String(code) : undefined

	if (sourceString !== undefined && codeString !== undefined) {
		return `${sourceString}(${codeString})`
	}

	return sourceString ?? codeString
}

function parseSvelteVerboseDiagnostic(line: string, cwd: string): Diagnostic | undefined {
	const payloadStart = line.indexOf('{')
	if (payloadStart <= 0 || !TIMESTAMPED_JSON_REGEX.test(line)) {
		return undefined
	}

	try {
		const value: unknown = JSON.parse(line.slice(payloadStart))
		if (
			!isRecord(value) ||
			(value.type !== 'ERROR' && value.type !== 'WARNING') ||
			typeof value.filename !== 'string' ||
			typeof value.message !== 'string' ||
			!isRecord(value.start) ||
			typeof value.start.line !== 'number' ||
			typeof value.start.character !== 'number'
		) {
			return undefined
		}

		const end = isRecord(value.end) ? value.end : undefined
		const rule = toRule(value.source, value.code)
		return {
			column: value.start.character + 1,
			...(end !== undefined &&
				typeof end.character === 'number' && { endColumn: end.character + 1 }),
			...(end !== undefined && typeof end.line === 'number' && { endLine: end.line + 1 }),
			file: normalizeDiagnosticPath(value.filename, cwd),
			line: value.start.line + 1,
			message: value.message,
			...(rule !== undefined && { rule }),
			severity: value.type === 'ERROR' ? 'error' : 'warning',
			tool: 'svelte-check',
		}
	} catch {
		return undefined
	}
}

function parseSvelteCompactDiagnostic(line: string, cwd: string): Diagnostic | undefined {
	const match = SVELTE_CHECK_MACHINE_DIAGNOSTIC_REGEX.exec(line)
	if (match?.groups === undefined) {
		return undefined
	}

	const { column, file, line: lineNumber, message, severity } = match.groups
	const parsedFile = parseJsonString(file ?? '')
	const parsedMessage = parseJsonString(message ?? '')
	if (parsedFile === undefined || parsedMessage === undefined) {
		return undefined
	}

	return {
		column: Number(column),
		file: normalizeDiagnosticPath(parsedFile, cwd),
		line: Number(lineNumber),
		message: parsedMessage,
		severity: severity === 'ERROR' ? 'error' : 'warning',
		tool: 'svelte-check',
	}
}

function parseSvelteFailureDiagnostic(line: string): Diagnostic | undefined {
	const match = SVELTE_CHECK_MACHINE_FAILURE_REGEX.exec(line)
	if (match?.groups === undefined) {
		return undefined
	}

	const rawMessage = match.groups.message ?? ''
	return {
		message: parseJsonString(rawMessage) ?? rawMessage,
		severity: 'error',
		tool: 'svelte-check',
	}
}

/** True for svelte-check output lines that carry no diagnostic information. */
export function isSvelteCheckNoise(line: string): boolean {
	return SVELTE_CHECK_HUMAN_NOISE_REGEX.test(line) || SVELTE_CHECK_MACHINE_NOISE_REGEX.test(line)
}

/** Parses svelte-check's machine and machine-verbose output formats. */
export function parseSvelteCheckOutput(context: CollectContext): CollectResult {
	const diagnostics: Diagnostic[] = []
	const unparsed: string[] = []

	for (const line of toOutputLines(`${context.stdout}\n${context.stderr}`)) {
		const diagnostic =
			parseSvelteVerboseDiagnostic(line, context.cwd) ??
			parseSvelteCompactDiagnostic(line, context.cwd) ??
			parseSvelteFailureDiagnostic(line)
		if (diagnostic !== undefined) {
			diagnostics.push(diagnostic)
			continue
		}

		if (!SVELTE_CHECK_MACHINE_CHROME_REGEX.test(line) && !isSvelteCheckNoise(line)) {
			unparsed.push(line)
		}
	}

	return addUnparsedFailureDiagnostic(context, diagnostics, 'svelte-check', unparsed)
}
