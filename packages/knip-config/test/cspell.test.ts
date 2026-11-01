import { execa } from 'execa'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { sharedKnipConfig } from '../src/config.js'

let tempDirectory: string

const knipCli = fileURLToPath(new URL('../bin/knip.js', import.meta.resolve('knip')))
const dictionary = '@kitschpatrol/dict-en-wiktionary'

beforeAll(async () => {
	tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'knip-cspell-test-'))
})

afterAll(async () => {
	await fs.rm(tempDirectory, { force: true, recursive: true })
})

async function createFixture(name: string, configFile: string): Promise<string> {
	const directory = path.join(tempDirectory, name)
	await fs.mkdir(directory, { recursive: true })
	const configPackage = '@kitschpatrol/cspell-config'
	const cspell = { import: [configPackage, `${dictionary}/cspell.json`] }
	await fs.writeFile(
		path.join(directory, 'package.json'),
		JSON.stringify({
			cspell: configFile === 'package.json' ? cspell : undefined,
			dependencies: { [configPackage]: '1.0.0', [dictionary]: '1.0.0' },
			name: 'knip-cspell-fixture',
			private: true,
			type: 'module',
		}),
	)
	await fs.writeFile(path.join(directory, 'knip.json'), JSON.stringify(sharedKnipConfig))
	await fs.writeFile(path.join(directory, 'index.js'), '')
	const dictionaryDirectory = path.join(directory, 'node_modules', dictionary)
	await fs.mkdir(dictionaryDirectory, { recursive: true })
	await fs.writeFile(
		path.join(dictionaryDirectory, 'package.json'),
		JSON.stringify({ name: dictionary, version: '1.0.0' }),
	)
	await fs.writeFile(path.join(dictionaryDirectory, 'cspell.json'), '{}')
	const configDirectory = path.join(directory, 'node_modules', configPackage)
	await fs.mkdir(configDirectory, { recursive: true })
	await fs.writeFile(
		path.join(configDirectory, 'package.json'),
		JSON.stringify({ main: 'index.js', name: configPackage, type: 'module', version: '1.0.0' }),
	)
	await fs.writeFile(
		path.join(configDirectory, 'index.js'),
		'export const cspellConfig = (config) => config\nexport default {}\n',
	)
	if (configFile !== 'package.json') {
		const configPath = path.join(directory, configFile)
		await fs.mkdir(path.dirname(configPath), { recursive: true })
		await fs.writeFile(
			configPath,
			configFile.endsWith('.ts')
				? `import { cspellConfig } from '${configPackage}'\nexport default cspellConfig(${JSON.stringify(cspell)})\n`
				: JSON.stringify(cspell),
		)
	}

	return directory
}

async function runKnip(
	directory: string,
): Promise<{ exitCode?: number; stderr: string; stdout: string }> {
	return execa(
		process.execPath,
		[
			knipCli,
			'--no-progress',
			'--no-config-hints',
			'--include',
			'dependencies,unlisted,unresolved',
			'--reporter',
			'json',
		],
		{ cwd: directory, reject: false },
	)
}

describe('CSpell dependency discovery without a direct cspell dependency', () => {
	it.each([
		'package.json',
		'cspell.config.ts',
		'.config/cspell.config.json',
		'.vscode/cspell.json',
	])('resolves dictionary imports from %s', async (configFile) => {
		const directory = await createFixture(configFile.replaceAll('/', '-'), configFile)
		const result = await runKnip(directory)

		expect(result.exitCode, `${result.stderr}${result.stdout}`).toBe(0)
	})

	it('allows the config factory to be installed through shared-config', async () => {
		const directory = await createFixture('transitive-config', 'cspell.config.ts')
		const manifestPath = path.join(directory, 'package.json')
		const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8')) as {
			dependencies: Record<string, string>
		}
		delete manifest.dependencies['@kitschpatrol/cspell-config']
		await fs.writeFile(manifestPath, JSON.stringify(manifest))
		const result = await runKnip(directory)

		expect(result.exitCode, `${result.stderr}${result.stdout}`).toBe(0)
	})

	it('reports an installed dictionary when it is no longer imported', async () => {
		const directory = await createFixture('unused', 'cspell.config.ts')
		await fs.writeFile(path.join(directory, 'cspell.config.ts'), 'export default {}\n')
		const result = await runKnip(directory)

		expect(result.exitCode).toBe(1)
		expect(result.stdout).toContain(dictionary)
	})
})
