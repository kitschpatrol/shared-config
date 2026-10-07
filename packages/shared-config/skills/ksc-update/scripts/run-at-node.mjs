/**
 * Runs a command with an exact Node.js release first in PATH, for the floor
 * checks in verification.md, and proves which binary every process used.
 *
 * The release is downloaded once into `<run directory>/node-<version>/` through
 * a `devEngines.runtime` fixture, so pnpm verifies the checksum and the user's
 * default runtime is untouched. A logging `node` shim placed first in PATH
 * records each invocation's version and arguments, so child processes that
 * resolve `node` from PATH, such as package bin shims, are covered too. A child
 * that hard-codes another binary does not appear in the log; treat a
 * suspiciously low invocation count as unverified.
 *
 * Usage:
 *
 * ```
 * node run-at-node.mjs <version> [--cwd <dir>] [--out <dir>] -- <command> [args...]
 * ```
 *
 * Writes `stdout.txt`, `stderr.txt`, `exit-code.txt`, and
 * `node-invocations.log` to `--out` (default `<run
 * directory>/node-<version>/last-run/`), prints a summary, and exits with the
 * command's exit code. The shim needs a POSIX shell, so this does not work on
 * Windows.
 */
import { execFileSync, spawnSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { delimiter, dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { runDirectory } from './lib.mjs'

const separator = process.argv.indexOf('--')
const head = process.argv.slice(2, separator === -1 ? undefined : separator)
const command = separator === -1 ? [] : process.argv.slice(separator + 1)
const version = head.shift()
if (version === undefined || !/^\d+\.\d+\.\d+$/v.test(version) || command.length === 0) {
	throw new Error(
		'Usage: node run-at-node.mjs <x.y.z> [--cwd <dir>] [--out <dir>] -- <command> [args...]',
	)
}

/** @type {Record<string, string>} */
const options = {}
for (let index = 0; index < head.length; index += 2) {
	options[(head[index] ?? '').replace(/^--/v, '')] = head[index + 1] ?? ''
}

const runtimeDirectory = join(runDirectory(), `node-${version}`)
mkdirSync(runtimeDirectory, { recursive: true })
writeFileSync(
	join(runtimeDirectory, 'package.json'),
	`${JSON.stringify({ devEngines: { runtime: { name: 'node', onFail: 'download', version } }, name: `node-runtime-${version}`, private: true }, undefined, 2)}\n`,
)
execFileSync('pnpm', ['install'], { cwd: runtimeDirectory, stdio: ['ignore', 'ignore', 'inherit'] })
const nodeBinary = execFileSync('pnpm', ['exec', 'node', '-p', 'process.execPath'], {
	cwd: runtimeDirectory,
	encoding: 'utf8',
}).trim()
const reported = execFileSync(nodeBinary, ['--version'], { encoding: 'utf8' }).trim()
if (reported !== `v${version}`) {
	throw new Error(`Expected Node.js v${version} at ${nodeBinary}, got ${reported}`)
}

const out = resolve(options.out ?? join(runtimeDirectory, 'last-run'))
const shimDirectory = join(out, 'shim')
const invocations = join(out, 'node-invocations.log')
mkdirSync(shimDirectory, { recursive: true })
writeFileSync(invocations, '')
const shim = join(shimDirectory, 'node')
writeFileSync(
	shim,
	[
		'#!/bin/sh',
		String.raw`printf '%s %s\n' '${reported}' "$*" | cut -c1-300 >> '${invocations}'`,
		`exec '${nodeBinary}' "$@"`,
		'',
	].join('\n'),
)
chmodSync(shim, 0o755)

const [executable = '', ...args] = command
const childEnvironment = {
	...process.env,
	// eslint-disable-next-line ts/naming-convention -- Environment variable names are uppercase.
	PATH: [shimDirectory, dirname(nodeBinary), process.env.PATH ?? ''].join(delimiter),
}
const result = spawnSync(executable, args, {
	cwd: options.cwd === undefined ? process.cwd() : resolve(options.cwd),
	encoding: 'utf8',
	env: childEnvironment,
	maxBuffer: 1024 ** 3,
})
writeFileSync(join(out, 'stdout.txt'), result.stdout)
writeFileSync(join(out, 'stderr.txt'), result.stderr)
const exitCode = result.status ?? 1
writeFileSync(join(out, 'exit-code.txt'), `${exitCode}\n`)

const lines = existsSync(invocations)
	? readFileSync(invocations, 'utf8').split('\n').filter(Boolean)
	: []
const versions = [...new Set(lines.map((line) => line.split(' ', 1)[0]))]
process.stdout.write(
	`${JSON.stringify({ exitCode, invocations: lines.length, nodeBinary, out, versions }, undefined, 2)}\n`,
)
if (result.error !== undefined) {
	throw result.error
}

process.exitCode = exitCode
