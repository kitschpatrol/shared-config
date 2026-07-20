import type { Stream } from 'node:stream'
import { Transform } from 'node:stream'
import { stripVTControlCharacters } from 'node:util'
import { getColors } from './color-utilities.js'
import { getOutputFormat } from './output-format.js'

// Define color type for picocolors
export type ForegroundColor =
	| 'black'
	| 'blackBright'
	| 'blue'
	| 'blueBright'
	| 'cyan'
	| 'cyanBright'
	| 'gray'
	| 'green'
	| 'greenBright'
	| 'magenta'
	| 'magentaBright'
	| 'red'
	| 'redBright'
	| 'white'
	| 'whiteBright'
	| 'yellow'
	| 'yellowBright'

const LINE_SPLIT_REGEX = /\r?\n/v
/**
 * Creates a transform stream that filters out lines that match the given
 * matcher. VT control characters are stripped before matching. Partial lines
 * are buffered across chunk boundaries so the matcher always sees whole lines.
 */
export function createStreamFilter(matcher: (text: string) => boolean): Transform {
	let remainder = ''

	const filterLines = (lines: string[]): string =>
		lines
			.filter((line) => {
				const plainLine = stripVTControlCharacters(line)
				return plainLine.trim() !== '' && !matcher(plainLine)
			})
			.map((line) => `${line}\n`)
			.join('')

	return new Transform({
		flush(callback) {
			callback(undefined, filterLines([remainder]))
		},
		transform(chunk: string | Uint8Array, _: BufferEncoding, callback) {
			const lines = (remainder + chunk.toString()).split(LINE_SPLIT_REGEX)
			remainder = lines.pop() ?? ''
			callback(undefined, filterLines(lines))
		},
	})
}

/**
 * Creates a transform stream that prepends a log prefix to each line. Partial
 * lines are buffered across chunk boundaries so a line split mid-chunk isn't
 * emitted as two prefixed lines. In machine output mode the prefix is
 * suppressed entirely so lines stay parseable by editor problem matchers.
 */
export function createStreamTransform(
	logPrefix: string | undefined,
	logColor?: ForegroundColor,
): Transform {
	const resolvedLogPrefix = getOutputFormat() === 'native' ? logPrefix : undefined
	const prefix =
		resolvedLogPrefix === undefined || resolvedLogPrefix === ''
			? ''
			: logColor === undefined
				? resolvedLogPrefix
				: getColors()[logColor](resolvedLogPrefix)

	let remainder = ''

	const transformLines = (lines: string[]): string =>
		lines
			.filter((line) => line.trim().length > 0)
			.map((line) => (prefix === '' ? `${line}\n` : `${prefix} ${line}\n`))
			.join('')

	return new Transform({
		flush(callback) {
			callback(undefined, transformLines([remainder]))
		},
		transform(chunk: string | Uint8Array, _: BufferEncoding, callback) {
			const lines = (remainder + chunk.toString()).split(LINE_SPLIT_REGEX)
			remainder = lines.pop() ?? ''
			callback(undefined, transformLines(lines))
		},
	})
}

/**
 * Converts a stream to a string
 */
export async function streamToString(stream: Stream): Promise<string> {
	const chunks: Uint8Array[] = []
	return new Promise((resolve, reject) => {
		stream.on('data', (chunk: Uint8Array) => {
			chunks.push(chunk)
		})
		stream.on('error', (error) => {
			reject(error as Error)
		})
		stream.on('end', () => {
			resolve(Buffer.concat(chunks).toString('utf8'))
		})
	})
}
