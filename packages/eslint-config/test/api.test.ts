import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { clearCache, fix, fixFile } from '../src/index.js'

let tempDirectory: string

beforeAll(async () => {
	tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'eslint-fix-test-'))
})

afterEach(() => {
	clearCache()
})

afterAll(async () => {
	await fs.rm(tempDirectory, { force: true, recursive: true })
})

// Uses prefer-const rule (auto-fixable: let → const when not reassigned)
const unfixed = 'let x = 1\nconsole.log(x)\n'

describe('fix', () => {
	it('should apply auto-fixable rules', async () => {
		const result = await fix(unfixed)
		expect(result).toContain('const x')
	})

	it('should return source unchanged when already valid', async () => {
		const source = 'const x = 1\nconsole.log(x)\n'
		const result = await fix(source)
		expect(result).toBe(source)
	})

	it('should fix with config overrides', async () => {
		const result = await fix(unfixed, { type: 'lib' })
		expect(result).toContain('const x')
	})

	it('should fix with filepath and config overrides', async () => {
		const result = await fix(unfixed, 'file.ts', { type: 'app' })
		expect(result).toContain('const x')
	})

	it('should accept a bare extension as file type', async () => {
		const result = await fix(unfixed, 'ts')
		expect(result).toContain('const x')
	})
})

describe('fixFile', () => {
	it('should fix a file in place', async () => {
		const filePath = path.join(tempDirectory, 'test.ts')
		await fs.writeFile(filePath, unfixed, 'utf8')

		await fixFile(filePath)

		const content = await fs.readFile(filePath, 'utf8')
		expect(content).toContain('const x')
	})

	it('should fix a file in place with config overrides', async () => {
		const filePath = path.join(tempDirectory, 'test-lib.ts')
		await fs.writeFile(filePath, unfixed, 'utf8')

		await fixFile(filePath, { type: 'lib' })

		const content = await fs.readFile(filePath, 'utf8')
		expect(content).toContain('const x')
	})
})

describe('clearCache', () => {
	it('should not throw', () => {
		expect(() => {
			clearCache()
		}).not.toThrow()
	})

	it('should allow subsequent fix calls after clearing', async () => {
		await fix(unfixed)
		clearCache()
		const result = await fix(unfixed)
		expect(result).toContain('const x')
	})
})
