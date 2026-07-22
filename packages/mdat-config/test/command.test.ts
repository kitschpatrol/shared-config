import { execa } from 'execa'
import { loadConfig } from 'mdat'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getChildColorEnvironment } from '../../../src/color-utilities.js'

const packageRoot = path.resolve(import.meta.dirname, '..')
const cliSource = path.join(packageRoot, 'src/cli.ts')
const tsxImport = import.meta.resolve('tsx')
const REPORTED_CONFIG_PATH_REGEX = /Found mdat readme configuration at "([^"]+)"/v

let tempDirectory: string

beforeEach(async () => {
	tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'mdat-command-test-'))
	await fs.writeFile(
		path.join(tempDirectory, 'package.json'),
		JSON.stringify({ name: 'mdat-command-test', private: true }),
		'utf8',
	)
})

afterEach(async () => {
	await fs.rm(tempDirectory, { force: true, recursive: true })
})

async function expectPrintConfig(ruleName: string, configPath: string): Promise<void> {
	const resolvedConfigPath = await fs.realpath(configPath)
	const config = await loadConfig({ searchFrom: tempDirectory })
	const previousTwoPassConfig = await loadConfig({
		additionalConfig: config,
		searchFrom: tempDirectory,
	})

	// The old second pass duplicated array-valued built-in rules.
	expect(previousTwoPassConfig).not.toEqual(config)

	const { exitCode, stdout } = await execa(
		process.execPath,
		['--import', tsxImport, cliSource, 'print-config'],
		{
			cwd: tempDirectory,
			env: getChildColorEnvironment(false),
		},
	)

	expect(exitCode).toBe(0)
	const reportedConfigPath = REPORTED_CONFIG_PATH_REGEX.exec(stdout)?.[1]
	expect(reportedConfigPath).toBeDefined()
	expect(await fs.realpath(reportedConfigPath!)).toBe(resolvedConfigPath)
	expect(stdout).toContain(`"${ruleName}"`)
	// Built-in defaults prove print-config returns the resolved config, not just user input.
	expect(stdout).toContain('"title"')
}

describe('print-config', () => {
	it('resolves a file-based configuration in one pass', async () => {
		expect.hasAssertions()
		const configPath = path.join(tempDirectory, 'mdat.config.ts')
		await fs.writeFile(configPath, `export default { 'file-rule': '**File rule.**' }\n`, 'utf8')

		await expectPrintConfig('file-rule', configPath)
	})

	it('resolves package.json configuration in one pass', async () => {
		expect.hasAssertions()
		const configPath = path.join(tempDirectory, 'package.json')
		await fs.writeFile(
			configPath,
			JSON.stringify({
				mdat: { 'package-rule': '**Package rule.**' },
				name: 'mdat-command-test',
				private: true,
			}),
			'utf8',
		)

		await expectPrintConfig('package-rule', configPath)
	})
})
