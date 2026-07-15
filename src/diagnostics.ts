import path from 'node:path'
import { stripVTControlCharacters } from 'node:util'

/** Severity of a normalized lint diagnostic. */
type DiagnosticSeverity = 'error' | 'info' | 'warning'

/**
 * A single issue reported by one of the lint tools, normalized to a shared
 * shape so machine and JSON output render from the same data.
 */
export type Diagnostic = {
	/** 1-indexed column. Omitted for file- or project-level issues. */
	column?: number
	endColumn?: number
	endLine?: number
	/**
	 * Path relative to the ksc invocation directory. Omitted for project-level
	 * issues.
	 */
	file?: string
	/** 1-indexed line. Omitted for file- or project-level issues. */
	line?: number
	message: string
	/** Tool-specific rule or code, e.g. `ts/no-unused-vars` or `TS2322`. */
	rule?: string
	severity: DiagnosticSeverity
	/** Replacement text proposed by the tool, e.g. a spelling correction. */
	suggestion?: string
	/** Short identifier of the tool that produced the diagnostic. */
	tool: string
}

/** Execution record for a single tool run within a lint pass. */
export type ToolRun = {
	durationMs: number
	exitCode: number
	name: string
	/** Output lines the tool's adapter could not interpret. */
	unparsed: string[]
}

/**
 * Aggregate report emitted by `ksc lint --format json` and `ksc fix --format
 * json`.
 */
export type LintReport = {
	cwd: string
	diagnostics: Diagnostic[]
	success: boolean
	summary: { errors: number; infos: number; warnings: number }
	tools: ToolRun[]
	version: 1
}

/**
 * Resolves a file path reported by a tool (relative to the tool's working
 * directory, or absolute) to a path relative to the ksc invocation directory.
 */
export function normalizeDiagnosticPath(filePath: string, toolCwd: string): string {
	const absolute = path.isAbsolute(filePath) ? filePath : path.resolve(toolCwd, filePath)
	const relative = path.relative(process.cwd(), absolute)
	return relative === '' ? '.' : relative
}

const WHITESPACE_RUN_REGEX = /\s*\n\s*/gv
const LINE_SPLIT_REGEX = /\r?\n/v

/**
 * Renders a diagnostic as a single GCC-style line for editor problem matchers:
 * `file:line:col: severity: message [tool/rule]`. Diagnostics without a file
 * render without a location and are ignored by matchers but stay visible.
 */
export function renderMachineDiagnostic(diagnostic: Diagnostic): string {
	const message = diagnostic.message.replaceAll(WHITESPACE_RUN_REGEX, ' ')
	const source =
		diagnostic.rule === undefined ? diagnostic.tool : `${diagnostic.tool}/${diagnostic.rule}`

	if (diagnostic.file === undefined) {
		return `${diagnostic.severity}: ${message} [${source}]`
	}

	return `${diagnostic.file}:${diagnostic.line ?? 1}:${diagnostic.column ?? 1}: ${diagnostic.severity}: ${message} [${source}]`
}

function compareDiagnostics(a: Diagnostic, b: Diagnostic): number {
	// Project-level diagnostics sort after file-specific ones
	const fileComparison = (a.file ?? '￿').localeCompare(b.file ?? '￿')
	if (fileComparison !== 0) {
		return fileComparison
	}

	const lineComparison = (a.line ?? 0) - (b.line ?? 0)
	if (lineComparison !== 0) {
		return lineComparison
	}

	return (a.column ?? 0) - (b.column ?? 0)
}

/** Assembles the aggregate JSON report for a lint pass. */
export function createLintReport(tools: ToolRun[], diagnostics: Diagnostic[]): LintReport {
	const sortedDiagnostics = diagnostics.toSorted(compareDiagnostics)

	return {
		cwd: process.cwd(),
		diagnostics: sortedDiagnostics,
		success: tools.every((tool) => tool.exitCode === 0),
		summary: {
			errors: sortedDiagnostics.filter((d) => d.severity === 'error').length,
			infos: sortedDiagnostics.filter((d) => d.severity === 'info').length,
			warnings: sortedDiagnostics.filter((d) => d.severity === 'warning').length,
		},
		tools,
		version: 1,
	}
}

/**
 * Splits captured tool output into trimmed, non-empty lines with VT control
 * characters removed. The standard preprocessing step before text parsing.
 */
export function toOutputLines(output: string): string[] {
	return stripVTControlCharacters(output)
		.split(LINE_SPLIT_REGEX)
		.map((line) => line.trimEnd())
		.filter((line) => line.trim().length > 0)
}
