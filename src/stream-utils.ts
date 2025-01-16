import type { Stream } from 'node:stream'
// eslint-disable-next-line unicorn/import-style
import chalk, { type foregroundColorNames } from 'chalk'
import { Transform } from 'node:stream'

type ChalkColor = (typeof foregroundColorNames)[number]

export function createStreamTransform(
	logPrefix: string | undefined,
	logColor: ChalkColor,
): Transform {
	return new Transform({
		transform(chunk: string | Uint8Array, _: BufferEncoding, callback) {
			const lines: string[] = chunk
				.toString()
				.split(/\r?\n/)
				.filter((line) => line.trim().length > 0)

			const transformed =
				lines.map((line) => `${logPrefix ? chalk[logColor](logPrefix) : ''} ${line}`).join('\n') +
				'\n'

			this.push(transformed)
			callback()
		},
	})
}

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
