import type { CollectContext, CollectResult } from '../../../../src/command-builder.js'
import type { Diagnostic } from '../../../../src/diagnostics.js'
import { normalizeDiagnosticPath, toOutputLines } from '../../../../src/diagnostics.js'
import { addUnparsedFailureDiagnostic, isContinuationLine, isRecord } from './shared.js'

// `astro check --json` applies to Astro's logger, while @astrojs/check still
// prints its diagnostics in TypeScript's human-readable format.
const ASTRO_FILE_DIAGNOSTIC_REGEX =
	/^(?<file>.+?):(?<line>\d+):(?<column>\d+) - (?<severity>error|warning|hint) (?<rule>[^:]+): (?<message>.*)$/v
const ASTRO_TEXT_LOG_REGEX =
	/^(?:\d{2}:\d{2}:\d{2} )?(?:✘ )?\[(?<severity>ERROR|WARN)\](?: \[(?<label>[^\]]+)\])? (?<message>.*)$/v
const ASTRO_TEXT_INFO_REGEX = /^\d{2}:\d{2}:\d{2}\s+\[(?!ERROR\]|WARN\])[^\]]+\]\s+/v
const ASTRO_RESULT_REGEX = /^(?:Result \(\d+ files?\):|- \d+ (?:errors?|warnings?|hints?))$/v
const ASTRO_CODE_CONTEXT_REGEX = /^(?:\d+\s.*|\s*[~^]+)$/v

type AstroLogEvent = {
	label?: string
	level: 'debug' | 'error' | 'info' | 'warn'
	message: string
}

function parseAstroLogEvent(line: string): AstroLogEvent | undefined {
	try {
		const value: unknown = JSON.parse(line)
		if (
			!isRecord(value) ||
			typeof value.message !== 'string' ||
			(value.level !== 'debug' &&
				value.level !== 'error' &&
				value.level !== 'info' &&
				value.level !== 'warn')
		) {
			return undefined
		}

		return {
			...(typeof value.label === 'string' && value.label.length > 0 && { label: value.label }),
			level: value.level,
			message: value.message,
		}
	} catch {
		return undefined
	}
}

function toAstroLogDiagnostic(logEvent: AstroLogEvent): Diagnostic | undefined {
	if (logEvent.level !== 'error' && logEvent.level !== 'warn') {
		return undefined
	}

	return {
		...(logEvent.label !== undefined && { rule: logEvent.label }),
		message: logEvent.message,
		severity: logEvent.level === 'error' ? 'error' : 'warning',
		tool: 'astro',
	}
}

function parseAstroFileDiagnostic(line: string, cwd: string): Diagnostic | undefined {
	const match = ASTRO_FILE_DIAGNOSTIC_REGEX.exec(line)
	if (match?.groups === undefined) {
		return undefined
	}

	const { column, file, line: lineNumber, message, rule, severity } = match.groups
	return {
		column: Number(column),
		file: normalizeDiagnosticPath(file ?? '', cwd),
		line: Number(lineNumber),
		message: message ?? '',
		rule: rule?.trim() ?? 'unknown',
		severity: severity === 'error' ? 'error' : severity === 'hint' ? 'info' : 'warning',
		tool: 'astro',
	}
}

function parseAstroTextLogDiagnostic(line: string): Diagnostic | undefined {
	const match = ASTRO_TEXT_LOG_REGEX.exec(line)
	if (match?.groups === undefined) {
		return undefined
	}

	const { label, message, severity } = match.groups
	return {
		...(label !== undefined && { rule: label }),
		message: message ?? '',
		severity: severity === 'ERROR' ? 'error' : 'warning',
		tool: 'astro',
	}
}

/** True for Astro output lines that carry no actionable information. */
export function isAstroCheckNoise(line: string): boolean {
	const normalizedLine = line.trimEnd()
	return (
		ASTRO_TEXT_INFO_REGEX.test(normalizedLine) ||
		ASTRO_RESULT_REGEX.test(normalizedLine) ||
		normalizedLine.startsWith('Getting diagnostics for Astro files in ')
	)
}

/**
 * Parses Astro's JSON logger records plus `@astrojs/check`'s remaining text
 * diagnostics. JSON logger warnings (for example adapter warnings) become
 * project-level diagnostics and therefore contribute to aggregate totals.
 */
export function parseAstroCheckOutput(context: CollectContext): CollectResult {
	const diagnostics: Diagnostic[] = []
	const unparsed: string[] = []

	for (const line of toOutputLines(`${context.stdout}\n${context.stderr}`)) {
		const logEvent = parseAstroLogEvent(line)
		if (logEvent !== undefined) {
			const diagnostic = toAstroLogDiagnostic(logEvent)
			if (diagnostic !== undefined) {
				diagnostics.push(diagnostic)
			}

			continue
		}

		const diagnostic =
			parseAstroFileDiagnostic(line, context.cwd) ?? parseAstroTextLogDiagnostic(line)
		if (diagnostic !== undefined) {
			diagnostics.push(diagnostic)
			continue
		}

		if (isAstroCheckNoise(line) || ASTRO_CODE_CONTEXT_REGEX.test(line)) {
			continue
		}

		const previousDiagnostic = diagnostics.at(-1)
		if (previousDiagnostic !== undefined && isContinuationLine(line)) {
			previousDiagnostic.message += `\n${line.trim()}`
			continue
		}

		unparsed.push(line)
	}

	return addUnparsedFailureDiagnostic(context, diagnostics, 'astro', unparsed)
}
