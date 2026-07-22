import { execa } from 'execa'
import fse from 'fs-extra'
import path from 'node:path'
import process from 'node:process'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { LintReport } from '../src/diagnostics.js'
import { version } from '../package.json' with { type: 'json' }

const inputFixtureDirectory = path.join(process.cwd(), 'test', 'fixtures', 'input')
const outputFixtureDirectory = path.join(process.cwd(), 'test', 'fixtures', 'output-fixed-auto')
// ESLint 10 searches for flat config from each linted file, so temporary fixtures must remain below the repository root.
const temporaryFixtureParentDirectory = path.join(process.cwd(), 'test', 'fixtures')
const fileScopedArguments = ['--skip', 'repo,mdat,knip,typescript']

async function expectDirectoriesToMatch(actualDirectory: string, expectedDirectory: string) {
	const actualDirectoryEntries = await fse.readdir(actualDirectory)
	const expectedDirectoryEntries = await fse.readdir(expectedDirectory)
	const actualFiles = actualDirectoryEntries.toSorted()
	const expectedFiles = expectedDirectoryEntries.toSorted()

	expect(actualFiles).toEqual(expectedFiles)
	for (const file of expectedFiles) {
		const actualContent = await fse.readFile(path.join(actualDirectory, file), 'utf8')
		const expectedContent = await fse.readFile(path.join(expectedDirectory, file), 'utf8')
		expect(actualContent).toBe(expectedContent)
	}
}

describe('CLI basics', () => {
	it('should print version', async () => {
		const { exitCode, stdout } = await execa('ksc', ['--version'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toBe(version)
	})

	it('should print version with short flag', async () => {
		const { exitCode, stdout } = await execa('ksc', ['-v'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toBe(version)
	})

	it('should print help', async () => {
		const { exitCode, stdout } = await execa('ksc', ['--help'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toMatchInlineSnapshot(`
			"ksc <command>

			Run aggregated @kitschpatrol/shared-config commands.

			Commands:
			  ksc <command>            Run aggregated @kitschpatrol/shared-config commands.  [default]
			  ksc init                 Initialize configuration files for the entire suite of @kitschpatrol/shared-config tools. Will use option flags where possible if provided, but some of the invoked tools will ignore them.
			  ksc lint [files..]       Lint your project with multiple tools in one go. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package scope.
			  ksc fix [files..]        Fix your project with multiple tools in one go. Tools without auto-fixes run their checks afterward, so remaining issues match a subsequent lint. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package scope.
			  ksc print-config [file]  Print aggregated tool configuration data. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package scope.

			Options:
			  -h, --help     Show help  [boolean]
			  -v, --version  Show version number  [boolean]"
		`)
	})

	it('should print help with short flag', async () => {
		const { exitCode, stdout } = await execa('ksc', ['-h'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toMatchInlineSnapshot(`
			"ksc <command>

			Run aggregated @kitschpatrol/shared-config commands.

			Commands:
			  ksc <command>            Run aggregated @kitschpatrol/shared-config commands.  [default]
			  ksc init                 Initialize configuration files for the entire suite of @kitschpatrol/shared-config tools. Will use option flags where possible if provided, but some of the invoked tools will ignore them.
			  ksc lint [files..]       Lint your project with multiple tools in one go. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package scope.
			  ksc fix [files..]        Fix your project with multiple tools in one go. Tools without auto-fixes run their checks afterward, so remaining issues match a subsequent lint. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package scope.
			  ksc print-config [file]  Print aggregated tool configuration data. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package scope.

			Options:
			  -h, --help     Show help  [boolean]
			  -v, --version  Show version number  [boolean]"
		`)
	})

	it('should document cache controls without exposing scheduler tuning', async () => {
		const { exitCode, stdout } = await execa('ksc', ['lint', '--help'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toBe(0)
		expect(stdout).toContain('--no-cache')
		expect(stdout).not.toContain('--concurrency')
	})

	describe('CLI rule configuration', () => {
		let tempDirectory: string
		let tempDirectoryRelative: string

		beforeEach(async () => {
			tempDirectory = await fse.mkdtemp(path.join(temporaryFixtureParentDirectory, 'cli-run-'))
			tempDirectoryRelative = path.relative(process.cwd(), tempDirectory)
			await fse.copy(inputFixtureDirectory, tempDirectory)
		})

		afterEach(async () => {
			await fse.rm(tempDirectory, { force: true, recursive: true })
		})

		it('should not fix anything unless asked', { timeout: 60_000 }, async () => {
			const { exitCode } = await execa(
				'ksc',
				['lint', tempDirectoryRelative, '--format', 'json', ...fileScopedArguments],
				{
					localDir: process.cwd(),
					preferLocal: true,
					reject: false,
				},
			)

			expect(exitCode).toBe(1)
			await expectDirectoriesToMatch(tempDirectory, inputFixtureDirectory)
		})

		it('should fix auto-fixable things', { timeout: 60_000 }, async () => {
			const { exitCode } = await execa(
				'ksc',
				['fix', tempDirectoryRelative, '--format', 'json', ...fileScopedArguments],
				{
					localDir: process.cwd(),
					preferLocal: true,
					reject: false,
				},
			)

			expect(exitCode).toBe(1)
			await expectDirectoriesToMatch(tempDirectory, outputFixtureDirectory)
		})

		it('should catch errors as expected', { timeout: 60_000 }, async () => {
			const { exitCode, stdout } = await execa(
				'ksc',
				['lint', tempDirectoryRelative, '--format', 'json', ...fileScopedArguments],
				{
					// Disable color output
					env: {
						// eslint-disable-next-line ts/naming-convention
						NO_COLOR: '1',
					},
					localDir: process.cwd(),
					preferLocal: true,
					reject: false,
				},
			)
			const report = JSON.parse(stdout) as LintReport

			expect(exitCode).toBe(1)
			expect(report.success).toBe(false)
			expect(report.summary.errors + report.summary.warnings).toBeGreaterThan(0)
			expect(
				report.diagnostics.some((diagnostic) =>
					diagnostic.file?.startsWith(`${tempDirectoryRelative}${path.sep}`),
				),
			).toBe(true)
		})
	})
})
