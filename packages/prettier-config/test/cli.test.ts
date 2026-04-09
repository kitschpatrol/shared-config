import { execaNode } from 'execa'
import fs from 'node:fs/promises'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const packageRoot = path.resolve(import.meta.dirname, '..')
const cliBin = path.join(packageRoot, 'bin/cli.js')
const fixturesDirectory = path.join(import.meta.dirname, 'fixtures')
const workDirectory = path.join(fixturesDirectory, 'work')

beforeEach(async () => {
	await fs.mkdir(workDirectory, { recursive: true })
})

afterEach(async () => {
	await fs.rm(workDirectory, { force: true, recursive: true })
})

/** Run the CLI with given args from the package root. */
async function runCli(...args: string[]) {
	return execaNode(cliBin, args, {
		cwd: packageRoot,
		// eslint-disable-next-line ts/naming-convention
		env: { NO_COLOR: '1' },
		reject: false,
	})
}

/** Write a deliberately unformatted file into the work directory. */
async function writeUnformatted(name: string, content = 'const   x=1\n') {
	const filePath = path.join(workDirectory, name)
	await fs.mkdir(path.dirname(filePath), { recursive: true })
	await fs.writeFile(filePath, content, 'utf8')
	return filePath
}

/** Return the file path relative to the package root. */
function getPackageRelativePath(absolutePath: string) {
	return path.relative(packageRoot, absolutePath)
}

describe('cli positional argument limiting', () => {
	it('should only format the specified file', async () => {
		const target = await writeUnformatted('target.ts')
		const bystander = await writeUnformatted('bystander.ts')

		await runCli('fix', getPackageRelativePath(target))

		const targetContent = await fs.readFile(target, 'utf8')
		const bystanderContent = await fs.readFile(bystander, 'utf8')

		expect(targetContent).toBe('const x = 1\n')
		expect(bystanderContent).toBe('const   x=1\n')
	})

	it('should only check the specified file via lint', async () => {
		const formatted = path.join(fixturesDirectory, 'formatted.ts')
		const unformatted = await writeUnformatted('bad.ts')

		// Checking only the well-formatted fixture should succeed
		const good = await runCli('lint', getPackageRelativePath(formatted))
		expect(good.exitCode).toBe(0)

		// Checking only the unformatted file should fail
		const bad = await runCli('lint', getPackageRelativePath(unformatted))
		expect(bad.exitCode).not.toBe(0)
	})

	it('should accept a glob pattern and only affect matching files', async () => {
		const tsA = await writeUnformatted('a.ts')
		const tsB = await writeUnformatted('b.ts')
		const jsonFile = await writeUnformatted('c.json', '{"a":  1}\n')

		await runCli('fix', 'test/fixtures/work/*.ts')

		const aContent = await fs.readFile(tsA, 'utf8')
		const bContent = await fs.readFile(tsB, 'utf8')
		const jsonContent = await fs.readFile(jsonFile, 'utf8')

		expect(aContent).toBe('const x = 1\n')
		expect(bContent).toBe('const x = 1\n')
		expect(jsonContent).toBe('{"a":  1}\n')
	})

	it('should accept multiple file arguments', async () => {
		const fileA = await writeUnformatted('multi-a.ts')
		const fileB = await writeUnformatted('multi-b.ts')
		const fileC = await writeUnformatted('multi-c.ts')

		await runCli('fix', getPackageRelativePath(fileA), getPackageRelativePath(fileB))

		const aContent = await fs.readFile(fileA, 'utf8')
		const bContent = await fs.readFile(fileB, 'utf8')
		const cContent = await fs.readFile(fileC, 'utf8')

		expect(aContent).toBe('const x = 1\n')
		expect(bContent).toBe('const x = 1\n')
		expect(cContent).toBe('const   x=1\n')
	})

	it('should default to "." when no files are given', async () => {
		const file = await writeUnformatted('default.ts')

		await runCli('fix')

		const content = await fs.readFile(file, 'utf8')
		expect(content).toBe('const x = 1\n')
	})
})
