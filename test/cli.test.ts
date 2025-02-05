/* eslint-disable import/no-named-as-default-member */
import { execa } from 'execa'
// eslint-disable-next-line import/default
import fse from 'fs-extra'
import path from 'node:path'
import process from 'node:process'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { version } from '../package.json'

describe('CLI basics', () => {
	it('should print version', async () => {
		const { exitCode, stdout } = await execa('kpsc', ['--version'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toBe(version)
	})

	it('should print version with short flag', async () => {
		const { exitCode, stdout } = await execa('kpsc', ['-v'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toBe(version)
	})

	it('should print help', async () => {
		const { exitCode, stdout } = await execa('kpsc', ['--help'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toMatchInlineSnapshot(`
			"kpsc <command>

			Run a command.

			Commands:
			  kpsc <command>            Run a command.  [default]
			  kpsc lint [files..]      Check for and report issues.
			  kpsc fix [files..]        Fix all auto-fixable issues, and report the un-fixable.
			  kpsc init                 Initialize by copying starter config files to your project root.
			  kpsc print-config <file>  Print the effective configuration at a certain path.

			Options:
			  -h, --help     Show help  [boolean]
			  -v, --version  Show version number  [boolean]"
		`)
	})

	it('should print help with short flag', async () => {
		const { exitCode, stdout } = await execa('kpsc', ['-h'], {
			localDir: process.cwd(),
			preferLocal: true,
		})

		expect(exitCode).toMatchInlineSnapshot(`0`)
		expect(stdout).toMatchInlineSnapshot(`
			"kpsc <command>

			Run a command.

			Commands:
			  kpsc <command>            Run a command.  [default]
			  kpsc lint [files..]      Check for and report issues.
			  kpsc fix [files..]        Fix all auto-fixable issues, and report the un-fixable.
			  kpsc init                 Initialize by copying starter config files to your project root.
			  kpsc print-config <file>  Print the effective configuration at a certain path.

			Options:
			  -h, --help     Show help  [boolean]
			  -v, --version  Show version number  [boolean]"
		`)
	})

	describe('CLI rule configuration', () => {
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

			await execa('kpsc', [], {
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
			const destinationDirectory = './test/fixtures/output-fixable/'
			await fse.copy(sourceDirectory, tempDirectory)

			await execa('kpsc', ['--fix'], {
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

			const { exitCode, stdout } = await execa('kpsc', [], {
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
