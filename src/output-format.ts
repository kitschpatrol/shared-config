/**
 * Output format selection for `ksc lint`:
 *
 * - `native`: each tool's own output, streamed live with colored log prefixes.
 * - `machine`: one plain, parseable line per issue for editor problem matchers.
 * - `json`: an aggregate structured report on stdout.
 *
 * State lives in the `KSC_FORMAT` environment variable rather than a module
 * variable so it automatically propagates from the aggregate `ksc` CLI to the
 * per-package `ksc-*` CLIs it spawns as subprocesses.
 */

const OUTPUT_FORMATS = ['json', 'machine', 'native'] as const

export type OutputFormat = (typeof OUTPUT_FORMATS)[number]

export const OUTPUT_FORMAT_OPTIONS = OUTPUT_FORMATS

function isOutputFormat(value: unknown): value is OutputFormat {
	return typeof value === 'string' && (OUTPUT_FORMATS as readonly string[]).includes(value)
}

/** The active output format, defaulting to `native`. */
export function getOutputFormat(): OutputFormat {
	const value = process.env.KSC_FORMAT
	return isOutputFormat(value) ? value : 'native'
}

/**
 * Sets `KSC_FORMAT` from a `--format <value>` or `--format=<value>` argument if
 * present. Must run before any output streams are created (so log prefixes are
 * suppressed consistently) and before yargs parses (so the environment variable
 * propagates to spawned `ksc-*` subprocesses). Invalid values are left for
 * yargs `choices` validation to reject.
 */
export function detectAndSetOutputFormat(): void {
	const { argv } = process
	for (const [index, argument] of argv.entries()) {
		let value: string | undefined
		if (argument === '--format') {
			value = argv[index + 1]
		} else if (argument.startsWith('--format=')) {
			value = argument.slice('--format='.length)
		}

		if (isOutputFormat(value)) {
			process.env.KSC_FORMAT = value
		}
	}
}
