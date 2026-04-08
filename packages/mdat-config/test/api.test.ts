import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { clearCache, fix, fixFile } from '../src/index.js'

let tempDirectory: string

beforeAll(async () => {
	tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'mdat-fix-test-'))
})

afterEach(() => {
	clearCache()
})

afterAll(async () => {
	await fs.rm(tempDirectory, { force: true, recursive: true })
})

describe('fix', () => {
	it('should expand mdat placeholders', async () => {
		const source = '<!-- shared-config -->\n<!-- /shared-config -->\n'
		const result = await fix(source)
		expect(result).toContain('Project configuration')
	})

	it('should return source unchanged when no placeholders', async () => {
		const source = '# Hello World\n'
		const result = await fix(source)
		expect(result).toContain('# Hello World')
	})

	it('should expand custom rules via config override', async () => {
		const source = '<!-- test-rule -->\n<!-- /test-rule -->\n'
		const result = await fix(source, { 'test-rule': '**Custom content.**' })
		expect(result).toContain('Custom content.')
	})
})

describe('fixFile', () => {
	it('should expand placeholders in a file in place', async () => {
		const filePath = path.join(tempDirectory, 'test.md')
		await fs.writeFile(filePath, '<!-- shared-config -->\n<!-- /shared-config -->\n', 'utf8')

		await fixFile(filePath)

		const content = await fs.readFile(filePath, 'utf8')
		expect(content).toContain('Project configuration')
	})

	it('should expand with config overrides', async () => {
		const filePath = path.join(tempDirectory, 'test-custom.md')
		await fs.writeFile(filePath, '<!-- my-rule -->\n<!-- /my-rule -->\n', 'utf8')

		await fixFile(filePath, { 'my-rule': '**Custom file content.**' })

		const content = await fs.readFile(filePath, 'utf8')
		expect(content).toContain('Custom file content.')
	})
})

describe('clearCache', () => {
	it('should not throw', () => {
		expect(() => {
			clearCache()
		}).not.toThrow()
	})

	it('should allow subsequent fix calls after clearing', async () => {
		const source = '<!-- shared-config -->\n<!-- /shared-config -->\n'
		await fix(source)
		clearCache()
		const result = await fix(source)
		expect(result).toContain('Project configuration')
	})
})
