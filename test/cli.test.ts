import { execa } from 'execa'
import fse from 'fs-extra'
import path from 'node:path'
import process from 'node:process'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { version } from '../package.json'

describe('CLI basics', () => {
	it('should print version', async () => {
		const { exitCode, stdout } = await execa('kpi', ['--version'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toBe(version)
	})

	it('should print version with short flag', async () => {
		const { exitCode, stdout } = await execa('kpi', ['-v'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toBe(version)
	})

	it('should print help', async () => {
		const { exitCode, stdout } = await execa('kpi', ['--help'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toMatchInlineSnapshot(`
			"kpi <command>

			Run aggregated @kitschpatrol/shared-config commands.

			Commands:
			  kpi <command>            Run aggregated @kitschpatrol/shared-config commands.  [default]
			  kpi init                 Initialize configuration files for the entire suite of @kitschpatrol/shared-config tools. Will use option flags where possible if provided, but some of the invoked tools will ignore them.
			  kpi lint [files..]       Lint your project with multiple tools in one go. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package-scope.
			  kpi fix [files..]        Fix your project with multiple tools in one go. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package-scope.
			  kpi print-config [file]  Print aggregated tool configuration data. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package-scope.

			Options:
			  -h, --help     Show help  [boolean]
			  -v, --version  Show version number  [boolean]"
		`)
	})

	it('should print help with short flag', async () => {
		const { exitCode, stdout } = await execa('kpi', ['-h'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toMatchInlineSnapshot(`
			"kpi <command>

			Run aggregated @kitschpatrol/shared-config commands.

			Commands:
			  kpi <command>            Run aggregated @kitschpatrol/shared-config commands.  [default]
			  kpi init                 Initialize configuration files for the entire suite of @kitschpatrol/shared-config tools. Will use option flags where possible if provided, but some of the invoked tools will ignore them.
			  kpi lint [files..]       Lint your project with multiple tools in one go. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package-scope.
			  kpi fix [files..]        Fix your project with multiple tools in one go. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package-scope.
			  kpi print-config [file]  Print aggregated tool configuration data. Will use file arguments / globs where possible if provided, but some of the invoked tools only operate at the package-scope.

			Options:
			  -h, --help     Show help  [boolean]
			  -v, --version  Show version number  [boolean]"
		`)
	})

	describe.skip('CLI rule configuration', () => {
		const tempDirectory = './input-copy/'

		beforeEach(async () => {
			await fse.rm(tempDirectory, { force: true, recursive: true })
		})

		afterAll(async () => {
			await fse.rm(tempDirectory, { force: true, recursive: true })
		})

		it('should not fix anything unless asked', { timeout: 60_000 }, async () => {
			const sourceDirectory = './test/fixtures/input/'
			await fse.copy(sourceDirectory, tempDirectory)

			await execa('kpi', [], {
				localDir: process.cwd(),
				preferLocal: true,
				reject: false,
			})

			for (const file of await fse.readdir(tempDirectory)) {
				const fileContent = await fse.readFile(path.join(tempDirectory, file), 'utf8')
				const originalContent = await fse.readFile(path.join(sourceDirectory, file), 'utf8')
				expect(fileContent).toEqual(originalContent)
			}
		})

		it('should fix auto-fixable things', { timeout: 60_000 }, async () => {
			const sourceDirectory = './test/fixtures/input/'
			const destinationDirectory = './test/fixtures/output-fixed-auto/'
			await fse.copy(sourceDirectory, tempDirectory)

			await execa('kpi', ['--fix'], {
				localDir: process.cwd(),
				preferLocal: true,
				reject: false,
			})

			for (const file of await fse.readdir(tempDirectory)) {
				const fileContent = await fse.readFile(path.join(tempDirectory, file), 'utf8')
				const destinationFilePath = path.join('../', destinationDirectory, path.basename(file))

				await fse.createFile(destinationFilePath)
				await expect(fileContent).toMatchFileSnapshot(destinationFilePath)
			}
		})

		it('should catch errors as expected', { timeout: 60_000 }, async () => {
			const sourceDirectory = './test/fixtures/input/'
			await fse.copy(sourceDirectory, tempDirectory)

			const { exitCode, stdout } = await execa('kpi', [], {
				// Disable color output
				env: {
					// Disable color output
					// eslint-disable-next-line ts/naming-convention
					NO_COLOR: '1',
				},
				localDir: process.cwd(),
				preferLocal: true,
				reject: false,
			})

			expect(exitCode).toMatchInlineSnapshot(`1`)
			//
			/* cspell:disable */
			expect(stdout).toMatchInlineSnapshot(`""`)
			//
			/* cspell:enable */
		})
	})
})
