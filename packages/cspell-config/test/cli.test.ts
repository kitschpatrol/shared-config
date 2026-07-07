/* CSpell:disable */
import { execaNode } from 'execa'
import fs from 'node:fs/promises'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const packageRoot = path.resolve(import.meta.dirname, '..')
const cliBin = path.join(packageRoot, 'bin/cli.js')
const fixturesDirectory = path.join(import.meta.dirname, 'fixtures')
const workDirectory = path.join(fixturesDirectory, 'work')

// CSpell loads dictionaries on every invocation, so runs are slow
const testTimeout = 120_000

const sortedWordsRegex = /words: \[['"]mmwordused['"], ['"]zzwordused['"]\]/v

beforeEach(async () => {
	await fs.mkdir(workDirectory, { recursive: true })
})

afterEach(async () => {
	await fs.rm(workDirectory, { force: true, recursive: true })
})

/** Run the CLI with the given args from the work directory. */
async function runCli(...args: string[]) {
	return execaNode(cliBin, args, {
		cwd: workDirectory,
		// eslint-disable-next-line ts/naming-convention
		env: { NO_COLOR: '1' },
		reject: false,
	})
}

/** Write a file into the work directory. */
async function writeWorkFile(name: string, content: string) {
	const filePath = path.join(workDirectory, name)
	await fs.writeFile(filePath, content, 'utf8')
	return filePath
}

describe('fix words in typescript config', () => {
	it(
		'should remove unused words and sort in a function-call config like cspellConfig()',
		async () => {
			// A local stand-in for the cspellConfig() helper, since the shared
			// config's ignorePaths can exclude the fixture files depending on
			// where the repo is checked out
			const configPath = await writeWorkFile(
				'cspell.config.ts',
				`function defineConfig(config: object): object {
	return config
}

export default defineConfig({
	useGitignore: false,
	words: ['zzwordused', 'aawordunused', 'mmwordused'],
})
`,
			)
			await writeWorkFile('document.md', 'The zzwordused and mmwordused terms appear here.\n')

			const { exitCode, stdout } = await runCli('fix')
			expect(exitCode).toBe(0)
			expect(stdout).toContain('Removed unused word: aawordunused')

			const configContent = await fs.readFile(configPath, 'utf8')
			expect(configContent).toContain('export default defineConfig({')
			expect(configContent).toContain('useGitignore: false')
			expect(configContent).not.toContain('aawordunused')
			expect(configContent).toMatch(sortedWordsRegex)
		},
		testTimeout,
	)

	it(
		'should refuse to modify the config when no files are checked',
		async () => {
			const originalContent = `export default {
	useGitignore: false,
	words: ['zzwordused'],
}
`
			const configPath = await writeWorkFile('cspell.config.ts', originalContent)

			// Glob matches no files, so word usage can't be determined
			const { exitCode } = await runCli('fix', 'no-such-directory/**')
			expect(exitCode).toBe(1)

			const configContent = await fs.readFile(configPath, 'utf8')
			expect(configContent).toBe(originalContent)
		},
		testTimeout,
	)

	it(
		'should sort words in a plain object config',
		async () => {
			const configPath = await writeWorkFile(
				'cspell.config.ts',
				`export default {
	useGitignore: false,
	words: ['zzwordused', 'mmwordused'],
}
`,
			)
			await writeWorkFile('document.md', 'The zzwordused and mmwordused terms appear here.\n')

			const { exitCode, stdout } = await runCli('fix')
			expect(exitCode).toBe(0)
			expect(stdout).toContain('Sorted the "words" array alphabetically.')

			const configContent = await fs.readFile(configPath, 'utf8')
			expect(configContent).toMatch(sortedWordsRegex)
		},
		testTimeout,
	)

	it(
		'should leave a clean and sorted config untouched',
		async () => {
			const originalContent = `export default {
	useGitignore: false,
	words: ['mmwordused', 'zzwordused'],
}
`
			const configPath = await writeWorkFile('cspell.config.ts', originalContent)
			await writeWorkFile('document.md', 'The zzwordused and mmwordused terms appear here.\n')

			const { exitCode } = await runCli('fix')
			expect(exitCode).toBe(0)

			const configContent = await fs.readFile(configPath, 'utf8')
			expect(configContent).toBe(originalContent)
		},
		testTimeout,
	)

	it(
		'should do nothing when the config has no words array',
		async () => {
			const originalContent = `export default {
	useGitignore: false,
}
`
			const configPath = await writeWorkFile('cspell.config.ts', originalContent)
			await writeWorkFile('document.md', 'Nothing interesting here.\n')

			const { exitCode, stdout } = await runCli('fix')
			expect(exitCode).toBe(0)
			expect(stdout).toContain('')

			const configContent = await fs.readFile(configPath, 'utf8')
			expect(configContent).toBe(originalContent)
		},
		testTimeout,
	)
})

describe('fix words in package.json config', () => {
	it(
		'should remove unused words and sort the cspell words array',
		async () => {
			const configPath = await writeWorkFile(
				'package.json',
				`${JSON.stringify(
					{
						cspell: {
							useGitignore: false,
							words: ['zzwordused', 'aawordunused', 'mmwordused'],
						},
						name: 'cspell-fix-fixture',
						type: 'module',
					},
					undefined,
					'\t',
				)}\n`,
			)
			await writeWorkFile('document.md', 'The zzwordused and mmwordused terms appear here.\n')

			const { exitCode, stdout } = await runCli('fix')
			expect(exitCode).toBe(0)
			expect(stdout).toContain('Removed unused word: aawordunused')

			const packageJson = JSON.parse(await fs.readFile(configPath, 'utf8')) as {
				cspell: { words: string[] }
				name: string
			}
			expect(packageJson.name).toBe('cspell-fix-fixture')
			expect(packageJson.cspell.words).toEqual(['mmwordused', 'zzwordused'])
		},
		testTimeout,
	)
})
