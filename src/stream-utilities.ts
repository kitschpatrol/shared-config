import type { foregroundColorNames } from 'chalk'
import type { Stream } from 'node:stream'
import chalk from 'chalk'
import { Transform } from 'node:stream'

type ChalkColor = (typeof foregroundColorNames)[number]

/**
 * Creates a transform stream that filters out lines that match the given matcher
 */
export function createStreamFilter(matcher: (text: string) => boolean): Transform {
	return new Transform({
		transform(chunk: string | Uint8Array, _: BufferEncoding, callback) {
			const filtered = chunk
				.toString()
				.split(/\r?\n/)
				.filter((line) => line.trim() !== '' && !matcher(line))
				.join('\n')
			this.push(filtered + '\n')
			callback()
		},
	})
}

/**
 * Creates a transform stream that prepends a log prefix to each line
 */
export function createStreamTransform(
	logPrefix: string | undefined,
	logColor?: ChalkColor,
): Transform {
	return new Transform({
		transform(chunk: string | Uint8Array, _: BufferEncoding, callback) {
			const lines: string[] = chunk
				.toString()
				.split(/\r?\n/)
				.filter((line) => line.trim().length > 0)

			const transformed = lines
				.map(
					(line) =>
						`${logPrefix ? (logColor === undefined ? logPrefix : chalk[logColor](logPrefix)) : ''} ${line}\n`,
				)
				.join('')

			this.push(transformed)
			callback()
		},
	})
}

/**
 * Converts a stream to a string
 */
export async function streamToString(stream: Stream): Promise<string> {
	const chunks: Uint8Array[] = []
	return new Promise((resolve, reject) => {
		stream.on('data', (chunk: Uint8Array) => chunks.push(chunk))
		stream.on('error', (error) => {
			reject(error as Error)
		})
		stream.on('end', () => {
			resolve(Buffer.concat(chunks).toString('utf8'))
		})
	})
}
