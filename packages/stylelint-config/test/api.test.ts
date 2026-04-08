import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { clearCache, fix, fixFile } from '../src/index.js'

let tempDirectory: string

beforeAll(async () => {
	tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'stylelint-fix-test-'))
})

afterEach(() => {
	clearCache()
})

afterAll(async () => {
	await fs.rm(tempDirectory, { force: true, recursive: true })
})

describe('fix', () => {
	it('should fix CSS with default file type', async () => {
		// Color-function-modern-notation: should convert rgb() to modern syntax
		const result = await fix('a { color: rgb(0, 0, 0); }\n')
		expect(result).toContain('rgb(0 0 0)')
	})

	it('should return source unchanged when already valid', async () => {
		const source = 'a {\n\tcolor: red;\n}\n'
		const result = await fix(source)
		expect(result).toBe(source)
	})

	it('should fix with a bare extension', async () => {
		const result = await fix('a { color: rgb(0, 0, 0); }\n', 'css')
		expect(result).toContain('rgb(0 0 0)')
	})

	it('should accept config overrides', async () => {
		const result = await fix('a { color: rgb(0, 0, 0); }\n', {
			rules: { 'color-hex-length': 'short' },
		})
		// Config accepted without error, fix still applies
		expect(result).toContain('rgb(0 0 0)')
	})

	it('should accept file type and config overrides', async () => {
		const result = await fix('a { color: rgb(0, 0, 0); }\n', 'scss', {
			rules: { 'color-hex-length': 'short' },
		})
		expect(result).toContain('rgb(0 0 0)')
	})
})

describe('fixFile', () => {
	it('should fix a file in place', async () => {
		const filePath = path.join(tempDirectory, 'test.css')
		await fs.writeFile(filePath, 'a { color: rgb(0, 0, 0); }\n', 'utf8')

		await fixFile(filePath)

		const content = await fs.readFile(filePath, 'utf8')
		expect(content).toContain('rgb(0 0 0)')
	})

	it('should fix a file in place with config overrides', async () => {
		const filePath = path.join(tempDirectory, 'test-override.css')
		await fs.writeFile(filePath, 'a { color: rgb(0, 0, 0); }\n', 'utf8')

		await fixFile(filePath, { rules: { 'color-hex-length': 'short' } })

		const content = await fs.readFile(filePath, 'utf8')
		// Fix still applies with overrides present
		expect(content).toContain('rgb(0 0 0)')
	})
})

describe('clearCache', () => {
	it('should not throw', () => {
		expect(() => {
			clearCache()
		}).not.toThrow()
	})

	it('should allow subsequent fix calls after clearing', async () => {
		await fix('a { color: rgb(0, 0, 0); }\n')
		clearCache()
		const result = await fix('a { color: rgb(0, 0, 0); }\n')
		expect(result).toContain('rgb(0 0 0)')
	})
})
