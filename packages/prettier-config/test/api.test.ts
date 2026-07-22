import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { clearCache, fix, fixFile } from '../src/index.js'

let tempDirectory: string

beforeAll(async () => {
	tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'prettier-fix-test-'))
})

afterEach(() => {
	clearCache()
})

afterAll(async () => {
	await fs.rm(tempDirectory, { force: true, recursive: true })
})

describe('fix', () => {
	it('should format a TypeScript string with default filepath', async () => {
		const result = await fix('const x=1')
		expect(result).toBe('const x = 1\n')
	})

	it('should format with config overrides', async () => {
		const result = await fix('const x = 1', { semi: true })
		expect(result).toBe('const x = 1;\n')
	})

	it('should format markdown with virtual filepath', async () => {
		const result = await fix('# Hello\nworld', 'file.md')
		expect(result).toContain('# Hello')
	})

	it('should apply markdown overrides (useTabs: false) via filepath', async () => {
		// Shared config sets useTabs: false for *.md files
		const input = '- item1\n  - nested\n'
		const result = await fix(input, 'file.md')
		expect(result).not.toContain('\t')
	})

	it('should format with filepath and config overrides', async () => {
		const result = await fix('const x = 1', 'file.ts', { semi: true })
		expect(result).toBe('const x = 1;\n')
	})

	it('should format JSON with virtual filepath', async () => {
		const result = await fix('{"a":1,"b":2}', 'file.json')
		expect(result).toContain('"a"')
		expect(result).toContain('\n')
	})

	it('should format JSDoc while sorting Tailwind classes', async () => {
		const input = [
			'/**',
			' * @param {  string   } name description',
			' */',
			'export function Greeting(name: string) {',
			'  return <div className="text-white p-4 flex">{name}</div>',
			'}',
		].join('\n')
		const result = await fix(input, 'file.tsx')

		expect(result).toContain('@param {string} name Description')
		expect(result).toContain('className="flex p-4 text-white"')
	})

	it.each([
		['Astro', 'file.astro'],
		['Svelte', 'file.svelte'],
	])('should sort Tailwind classes in the %s parser override', async (_, filePath) => {
		const result = await fix('<div class="text-white p-4 flex">Hello</div>', filePath)

		expect(result).toContain('class="flex p-4 text-white"')
	})

	it('should accept a bare extension as file type', async () => {
		const result = await fix('{"a":1,"b":2}', 'json')
		expect(result).toContain('"a"')
		expect(result).toContain('\n')
	})

	it('should apply markdown overrides via bare extension', async () => {
		const input = '- item1\n  - nested\n'
		const result = await fix(input, 'md')
		expect(result).not.toContain('\t')
	})
})

describe('fixFile', () => {
	it('should format a file in place', async () => {
		const filePath = path.join(tempDirectory, 'test.ts')
		await fs.writeFile(filePath, 'const x=1', 'utf8')

		await fixFile(filePath)

		const content = await fs.readFile(filePath, 'utf8')
		expect(content).toBe('const x = 1\n')
	})

	it('should format a file in place with config overrides', async () => {
		const filePath = path.join(tempDirectory, 'test-semi.ts')
		await fs.writeFile(filePath, 'const x = 1', 'utf8')

		await fixFile(filePath, { semi: true })

		const content = await fs.readFile(filePath, 'utf8')
		expect(content).toBe('const x = 1;\n')
	})

	it('should apply overrides based on file extension', async () => {
		const filePath = path.join(tempDirectory, 'test.md')
		await fs.writeFile(filePath, '# Hello\nworld\n', 'utf8')

		await fixFile(filePath)

		const content = await fs.readFile(filePath, 'utf8')
		expect(content).not.toContain('\t')
	})

	it('should apply parser overrides without a local config file', async () => {
		const filePath = path.join(tempDirectory, 'test.svelte')
		await fs.writeFile(filePath, '<script>const x=1</script>\n<div>{x}</div>', 'utf8')

		await fixFile(filePath)

		const content = await fs.readFile(filePath, 'utf8')
		expect(content).toContain('<script>')
		expect(content).toContain('<div>{x}</div>')
	})
})

describe('clearCache', () => {
	it('should not throw', () => {
		expect(() => {
			clearCache()
		}).not.toThrow()
	})

	it('should allow subsequent fix calls after clearing', async () => {
		await fix('const x=1')
		clearCache()
		const result = await fix('const x=1')
		expect(result).toBe('const x = 1\n')
	})
})
