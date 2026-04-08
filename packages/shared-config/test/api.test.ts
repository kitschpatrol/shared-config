import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { clearCache, fix, fixFile } from '../src/index.js'

let tempDirectory: string

beforeAll(async () => {
	tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'shared-config-fix-test-'))
})

afterEach(() => {
	clearCache()
})

afterAll(async () => {
	await fs.rm(tempDirectory, { force: true, recursive: true })
})

describe('fix', () => {
	it('should fix a TypeScript string (eslint + prettier)', async () => {
		// Prefer-const (eslint) + formatting (prettier)
		const result = await fix('let x = 1\nconsole.log(x)\n', 'ts')
		expect(result).toContain('const x')
	})

	it('should fix a CSS string (stylelint + prettier)', async () => {
		const result = await fix('a { color: rgb(0, 0, 0); }\n', 'css')
		expect(result).toContain('rgb(0 0 0)')
	})

	it('should silently skip mismatched tools', async () => {
		// Running all tools on CSS should not throw
		const source = 'a {\n\tcolor: red;\n}\n'
		const result = await fix(source, 'css')
		expect(result).toContain('color: red')
	})
})

describe('fixFile', () => {
	it('should fix a TypeScript file in place', async () => {
		const filePath = path.join(tempDirectory, 'test.ts')
		await fs.writeFile(filePath, 'let x = 1\nconsole.log(x)\n', 'utf8')

		await fixFile(filePath)

		const content = await fs.readFile(filePath, 'utf8')
		expect(content).toContain('const x')
	})

	it('should fix a CSS file in place', async () => {
		const filePath = path.join(tempDirectory, 'test.css')
		await fs.writeFile(filePath, 'a { color: rgb(0, 0, 0); }\n', 'utf8')

		await fixFile(filePath)

		const content = await fs.readFile(filePath, 'utf8')
		expect(content).toContain('rgb(0 0 0)')
	})
})

describe('clearCache', () => {
	it('should not throw', () => {
		expect(() => {
			clearCache()
		}).not.toThrow()
	})
})
