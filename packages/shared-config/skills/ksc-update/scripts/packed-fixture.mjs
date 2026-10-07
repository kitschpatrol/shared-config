/**
 * Creates an isolated consumer fixture for the packed-build checks in
 * verification.md and installs it. It only sets up and installs; run the
 * repository's representative CLI and API checks inside the printed fixture
 * directory afterwards.
 *
 * Packed mode (default) runs `pnpm pack` for every published workspace package,
 * depends on the requested packages through `file:` tarballs, and adds an
 * `overrides` entry for every packed package. Packing rewrites `workspace:`
 * ranges to registry versions, so without the overrides sibling packages would
 * silently come from the registry instead of this build.
 *
 * Published mode (`--published`) depends on the given `name@version` specs from
 * the registry instead, for the fresh-install check of the current release.
 *
 * `--before-install <command>` runs a shell command in the fixture before the
 * install, for consumer setup that must exist first, such as an init command
 * that writes hoisting settings. It receives `FIXTURE_TARBALLS`, the path of a
 * JSON file mapping package names to tarball paths. If the command writes
 * `pnpm-workspace.yaml`, the script appends its `overrides` and `allowBuilds`
 * blocks only when those keys are absent, and fails otherwise.
 *
 * Usage, from the workspace root:
 *
 * ```
 * node packed-fixture.mjs <state> [package...] [--before-install <command>]
 * node packed-fixture.mjs <state> --published <name@version>... [--before-install <command>]
 * ```
 *
 * Results go to `<run directory>/<state>/`: `fixture/`, `tarballs/`,
 * `tarballs.json`, `packed-manifests.json`, `install.log`, and `install.exit`.
 * Packages default to every published workspace package.
 */
import { execFileSync, spawnSync } from 'node:child_process'
import {
	appendFileSync,
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	realpathSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { join, relative, resolve } from 'node:path'
import process from 'node:process'
import { asString, isRecord, pnpmJson, readJson, runDirectory } from './lib.mjs'

const argv = process.argv.slice(2)
const state = argv.shift()
if (state === undefined || state.startsWith('--') || !/^[\w.\-]+$/v.test(state)) {
	throw new Error(
		'Usage: node packed-fixture.mjs <state> [package...] [--published] [--before-install <command>]',
	)
}

let published = false
/** @type {string | undefined} */
let beforeInstall
/** @type {string[]} */
const requested = []
for (let index = 0; index < argv.length; index++) {
	const argument = argv[index] ?? ''
	if (argument === '--published') {
		published = true
	} else if (argument === '--before-install') {
		beforeInstall = argv[++index]
	} else {
		requested.push(argument)
	}
}

const run = runDirectory()
const stateDirectory = resolve(run, state)
if (relative(run, stateDirectory).startsWith('..')) {
	throw new Error(`State directory ${stateDirectory} escapes the run directory ${run}`)
}

const fixture = join(stateDirectory, 'fixture')
const tarballDirectory = join(stateDirectory, 'tarballs')
rmSync(fixture, { force: true, recursive: true })
rmSync(tarballDirectory, { force: true, recursive: true })
mkdirSync(fixture, { recursive: true })
mkdirSync(tarballDirectory, { recursive: true })

/** @type {Record<string, string>} */
const tarballs = {}
/** @type {Record<string, string>} */
const dependencies = {}
/** @type {Record<string, unknown>[]} */
const manifests = []

if (published) {
	if (requested.length === 0) {
		throw new Error('--published needs at least one name@version spec')
	}

	for (const spec of requested) {
		const at = spec.lastIndexOf('@')
		if (at <= 0) {
			throw new Error(`Expected name@version, got ${spec}`)
		}

		dependencies[spec.slice(0, at)] = spec.slice(at + 1)
	}
} else {
	const projects = pnpmJson(['-r', 'ls', '--depth', '-1', '--json'])
	if (!Array.isArray(projects)) {
		throw new TypeError('Expected a JSON array from pnpm -r ls')
	}

	for (const project of projects) {
		const projectPath = isRecord(project) ? asString(project.path) : undefined
		if (projectPath === undefined) {
			continue
		}

		const manifest = readJson(join(projectPath, 'package.json'))
		if (!isRecord(manifest) || manifest.private === true) {
			continue
		}

		const name = asString(manifest.name)
		if (name === undefined) {
			continue
		}

		const before = new Set(readdirSync(tarballDirectory))
		execFileSync('pnpm', ['pack', '--pack-destination', tarballDirectory], {
			cwd: projectPath,
			stdio: ['ignore', 'ignore', 'inherit'],
		})
		const created = readdirSync(tarballDirectory).find((file) => !before.has(file))
		if (created === undefined) {
			throw new Error(`pnpm pack produced no tarball for ${name}`)
		}

		tarballs[name] = join(tarballDirectory, created)
		const packedManifest = execFileSync('tar', ['-xzOf', tarballs[name], 'package/package.json'], {
			encoding: 'utf8',
		})
		const parsed = /** @type {unknown} */ (JSON.parse(packedManifest))
		if (isRecord(parsed)) {
			manifests.push({
				bin: parsed.bin,
				dependencies: parsed.dependencies,
				engines: parsed.engines,
				exports: parsed.exports,
				files: execFileSync('tar', ['-tzf', tarballs[name]], { encoding: 'utf8' })
					.split('\n')
					.filter(Boolean)
					.toSorted(),
				name,
				peerDependencies: parsed.peerDependencies,
				sideEffects: parsed.sideEffects,
				version: parsed.version,
			})
		}
	}

	const targets = requested.length > 0 ? requested : Object.keys(tarballs)
	for (const name of targets) {
		const tarball = tarballs[name]
		if (tarball === undefined) {
			throw new Error(`${name} is not a published workspace package`)
		}

		dependencies[name] = `file:${tarball}`
	}
}

const tarballsJson = join(stateDirectory, 'tarballs.json')
writeFileSync(tarballsJson, `${JSON.stringify(tarballs, undefined, 2)}\n`)
writeFileSync(
	join(stateDirectory, 'packed-manifests.json'),
	`${JSON.stringify(manifests, undefined, 2)}\n`,
)
writeFileSync(
	join(fixture, 'package.json'),
	`${JSON.stringify({ dependencies, name: 'ksc-update-fixture', private: true, type: 'module', version: '0.0.0' }, undefined, 2)}\n`,
)
execFileSync('git', ['init', '-q'], { cwd: fixture })

if (beforeInstall !== undefined) {
	// eslint-disable-next-line ts/naming-convention -- Environment variable names are uppercase.
	const fixtureEnvironment = { ...process.env, FIXTURE_TARBALLS: tarballsJson }
	const result = spawnSync(beforeInstall, {
		cwd: fixture,
		env: fixtureEnvironment,
		shell: true,
		stdio: 'inherit',
	})
	if (result.status !== 0) {
		throw new Error(`--before-install command exited with ${result.status ?? result.signal}`)
	}
}

const workspaceFile = join(fixture, 'pnpm-workspace.yaml')
const existing = existsSync(workspaceFile) ? readFileSync(workspaceFile, 'utf8') : ''
/** @type {string[]} */
const blocks = []
const overrideLines = Object.entries(tarballs).map(([name, path]) => `  '${name}': file:${path}`)
if (overrideLines.length > 0) {
	if (/^overrides:/mv.test(existing)) {
		throw new Error(`${workspaceFile} already has overrides; merge the tarball overrides by hand`)
	}

	blocks.push(['overrides:', ...overrideLines].join('\n'))
}

const repositoryWorkspace = existsSync('pnpm-workspace.yaml')
	? readFileSync('pnpm-workspace.yaml', 'utf8')
	: ''
const allowBuilds = /^allowBuilds:\n((?: {2}.+\n)+)/mv.exec(repositoryWorkspace)?.[1]
if (allowBuilds !== undefined && !/^allowBuilds:/mv.test(existing)) {
	blocks.push(`allowBuilds:\n${allowBuilds.trimEnd()}`)
}

if (blocks.length > 0) {
	appendFileSync(
		workspaceFile,
		`${existing === '' || existing.endsWith('\n') ? '' : '\n'}${blocks.join('\n')}\n`,
	)
}

const install = spawnSync('pnpm', ['install'], { cwd: fixture, encoding: 'utf8' })
writeFileSync(join(stateDirectory, 'install.log'), `${install.stdout}${install.stderr}`)
writeFileSync(join(stateDirectory, 'install.exit'), `${install.status}\n`)

/** @type {Record<string, string | undefined>} */
const resolved = {}
for (const name of Object.keys(dependencies)) {
	const manifestPath = join(fixture, 'node_modules', name, 'package.json')
	resolved[name] = existsSync(manifestPath)
		? `${asString(/** @type {Record<string, unknown>} */ (readJson(manifestPath)).version)} at ${realpathSync(join(fixture, 'node_modules', name))}`
		: undefined
}

process.stdout.write(
	`${JSON.stringify({ fixture, installExit: install.status, resolved, stateDirectory }, undefined, 2)}\n`,
)
if (install.status !== 0) {
	process.stderr.write(
		`pnpm install failed in ${fixture}; see ${join(stateDirectory, 'install.log')}\n`,
	)
	process.exitCode = 1
}
