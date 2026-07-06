import type { Stream } from 'node:stream'
import { Transform } from 'node:stream'
import { stripVTControlCharacters } from 'node:util'
import picocolors from 'picocolors'

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
 * matcher. VT control characters are stripped before matching.
 */
export function createStreamFilter(matcher: (text: string) => boolean): Transform {
	return new Transform({
		transform(chunk: string | Uint8Array, _: BufferEncoding, callback) {
			const filtered = chunk
				.toString()
				.split(LINE_SPLIT_REGEX)
				.filter((line) => line.trim() !== '' && !matcher(stripVTControlCharacters(line)))
				.join('\n')
			callback(undefined, filtered + '\n')
		},
	})
}

/**
 * Creates a transform stream that prepends a log prefix to each line
 */
export function createStreamTransform(
	logPrefix: string | undefined,
	logColor?: ForegroundColor,
): Transform {
	const prefix =
		logPrefix === undefined || logPrefix === ''
			? ''
			: logColor === undefined
				? logPrefix
				: picocolors[logColor](logPrefix)

	return new Transform({
		transform(chunk: string | Uint8Array, _: BufferEncoding, callback) {
			const lines: string[] = chunk
				.toString()
				.split(LINE_SPLIT_REGEX)
				.filter((line) => line.trim().length > 0)

			const transformed = lines.map((line) => `${prefix} ${line}\n`).join('')

			callback(undefined, transformed)
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
