import picocolors from 'picocolors'
import { getOutputFormat } from './output-format.js'

type Colors = ReturnType<typeof picocolors.createColors>

/** Destination stream for a color decision. Only TTY-ness matters. */
type ColorDestination = { isTTY?: boolean }

/**
 * The color decision forced by the environment, or `undefined` when the
 * destination stream should decide. `NO_COLOR` (non-empty, per
 * https://no-color.org) beats `FORCE_COLOR`, which forces color on, or off for
 * `'0'` / `'false'`, following Node and chalk convention. `TERM=dumb`
 * disables.
 */
function environmentColorOverride(): boolean | undefined {
	const { env } = process
	if (env.NO_COLOR !== undefined && env.NO_COLOR !== '') {
		return false
	}

	if (env.FORCE_COLOR !== undefined) {
		return env.FORCE_COLOR !== '0' && env.FORCE_COLOR !== 'false'
	}

	if (env.TERM === 'dumb') {
		return false
	}

	return undefined
}

/**
 * Single color decision shared by log chrome, spawned tool environments, and
 * JSON colorization: environment overrides first, otherwise color when the
 * stream is a TTY. On CI, streams aren't TTYs but CI log renderers display ANSI
 * color, so `ciColor` (the default) enables color there too. Disable it for
 * output that is typically captured and parsed on CI, like the JSON report.
 */
export function shouldColorStream(
	stream: ColorDestination,
	{ ciColor = true }: { ciColor?: boolean } = {},
): boolean {
	const override = environmentColorOverride()
	if (override !== undefined) {
		return override
	}

	if (stream.isTTY === true) {
		return true
	}

	return ciColor && Boolean(process.env.CI)
}

/**
 * The stream human-facing log output is written to: stderr in JSON mode, where
 * stdout is reserved for the report, and stdout otherwise.
 */
export function getLogDestination(): NodeJS.WriteStream {
	return getOutputFormat() === 'json' ? process.stderr : process.stdout
}

/**
 * Picocolors instance following the shared color decision for the log
 * destination. Machine format is always plain so ANSI codes never reach the
 * parseable stream, even under FORCE_COLOR or CI.
 */
export function getColors(): Colors {
	if (getOutputFormat() === 'machine') {
		return picocolors.createColors(false)
	}

	return picocolors.createColors(shouldColorStream(getLogDestination()))
}

/**
 * Environment overrides for spawned child tools, which write to pipes and would
 * make the wrong color decision on their own. When color is enabled, forces it
 * on while preserving a user-set FORCE_COLOR level (e.g. `3` for truecolor).
 * When disabled, sets both variables so the decision wins regardless of whether
 * the child honors NO_COLOR (picocolors) or gives FORCE_COLOR precedence
 * (chalk).
 */
export function getChildColorEnvironment(colorEnabled: boolean): Record<string, string> {
	/* eslint-disable ts/naming-convention */
	if (!colorEnabled) {
		return { FORCE_COLOR: '0', NO_COLOR: '1' }
	}

	const forceColor = process.env.FORCE_COLOR
	return forceColor === undefined || forceColor === '' ? { FORCE_COLOR: '1' } : {}
	/* eslint-enable ts/naming-convention */
}
