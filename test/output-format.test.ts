import { execa } from 'execa'
import fse from 'fs-extra'
import path from 'node:path'
import process from 'node:process'
import { stripVTControlCharacters } from 'node:util'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { LintReport } from '../src/diagnostics.js'
import { mergeVsCodeTasks } from '../src/json-utilities.js'

const fixtureDirectory = path.join(process.cwd(), 'test', 'fixtures', 'output-format')
const fixtureFile = path.join(fixtureDirectory, 'output-format-fixture.ts')
const fixtureFileRelative = path.relative(process.cwd(), fixtureFile)

// "test/fixtures/output-format/output-format-fixture.ts:1:7: error: message [eslint/rule]"
const MACHINE_LINE_REGEX = /^(?<file>.+?):(?<line>\d+):(?<column>\d+): error: .+ \[eslint\/\S+\]$/mv

async function runKscEslintLint(
	extraArguments: string[],
	environment: Record<string, string> = {},
) {
	return execa('ksc-eslint', ['lint', fixtureFileRelative, ...extraArguments], {
		env: environment,
		localDir: process.cwd(),
		preferLocal: true,
		reject: false,
	})
}

beforeAll(async () => {
	// Guaranteed eslint errors: ts/naming-convention and ts/no-unused-vars
	await fse.outputFile(fixtureFile, 'const unusedVariable = 1\n')
})

afterAll(async () => {
	await fse.remove(fixtureDirectory)
})

describe('machine output format', () => {
	it('emits one normalized parseable line per issue with --format machine', async () => {
		const { exitCode, stdout } = await runKscEslintLint(['--format', 'machine'])

		expect(exitCode).toBe(1)
		// No ANSI color codes
		expect(stdout).toBe(stripVTControlCharacters(stdout))
		// No log prefixes
		expect(stdout).not.toContain('[ESLint]')
		expect(stdout).toMatch(MACHINE_LINE_REGEX)
		expect(stdout).toContain('[eslint/ts/no-unused-vars]')
		// Paths are relative to the invocation directory
		expect(stdout).toContain(`${fixtureFileRelative}:`)
	})

	// Runs the CLI twice, so it needs extra headroom on slow Windows CI runners
	it(
		'emits identical output with the KSC_FORMAT environment variable',
		{ timeout: 60_000 },
		async () => {
			const flagResult = await runKscEslintLint(['--format', 'machine'])
			// eslint-disable-next-line ts/naming-convention
			const environmentResult = await runKscEslintLint([], { KSC_FORMAT: 'machine' })

			expect(environmentResult.exitCode).toBe(1)
			expect(environmentResult.stdout).toBe(flagResult.stdout)
		},
	)

	it('rejects invalid format values', async () => {
		const { exitCode, stderr } = await runKscEslintLint(['--format', 'bogus'])

		expect(exitCode).not.toBe(0)
		expect(stderr).toContain('Invalid values')
	})
})

describe('json output format', () => {
	it('emits an aggregate report on stdout with --format json', async () => {
		const { exitCode, stdout } = await runKscEslintLint(['--format', 'json'])

		expect(exitCode).toBe(1)
		const report = JSON.parse(stdout) as LintReport

		expect(report.version).toBe(1)
		expect(report.success).toBe(false)
		expect(report.cwd).toBe(process.cwd())
		expect(report.summary.errors).toBeGreaterThan(0)

		expect(report.tools).toHaveLength(1)
		expect(report.tools[0]?.name).toBe('eslint')
		expect(report.tools[0]?.exitCode).toBe(1)
		expect(report.tools[0]?.durationMs).toBeGreaterThan(0)

		const diagnostic = report.diagnostics.find((d) => d.rule === 'ts/no-unused-vars')
		expect(diagnostic).toBeDefined()
		expect(diagnostic?.tool).toBe('eslint')
		expect(diagnostic?.file).toBe(fixtureFileRelative)
		expect(diagnostic?.line).toBe(1)
		expect(diagnostic?.column).toBe(7)
		expect(diagnostic?.severity).toBe('error')
	})

	it('reports success on a clean file', async () => {
		const cleanFile = path.join(fixtureDirectory, 'clean-fixture.ts')
		await fse.outputFile(cleanFile, 'export const usedVariable = 1\n')

		const { exitCode, stdout } = await execa(
			'ksc-eslint',
			['lint', path.relative(process.cwd(), cleanFile), '--format', 'json'],
			{
				localDir: process.cwd(),
				preferLocal: true,
				reject: false,
			},
		)

		expect(exitCode).toBe(0)
		const report = JSON.parse(stdout) as LintReport
		expect(report.success).toBe(true)
		expect(report.diagnostics).toHaveLength(0)
		expect(report.summary).toEqual({ errors: 0, infos: 0, warnings: 0 })
	})
})

describe('fix output format', () => {
	const fixFixtureFile = path.join(fixtureDirectory, 'fix-fixture.ts')
	const fixFixtureFileRelative = path.relative(process.cwd(), fixFixtureFile)

	async function runKscEslintFix(extraArguments: string[]) {
		return execa('ksc-eslint', ['fix', fixFixtureFileRelative, ...extraArguments], {
			localDir: process.cwd(),
			preferLocal: true,
			reject: false,
		})
	}

	it('applies fixes and reports remaining issues with --format machine', async () => {
		// Prefer-const is auto-fixable, ts/no-unused-vars is not
		await fse.outputFile(
			fixFixtureFile,
			'let fixableVariable = 1\nconst unusedVariable = 2\nexport { fixableVariable }\n',
		)

		const { exitCode, stdout } = await runKscEslintFix(['--format', 'machine'])

		expect(exitCode).toBe(1)
		// The fix was still applied even though output was collected
		expect(await fse.readFile(fixFixtureFile, 'utf8')).toContain('const fixableVariable')
		// Only the unfixable issues remain, as parseable lines without prefixes
		expect(stdout).toBe(stripVTControlCharacters(stdout))
		expect(stdout).not.toContain('[ESLint]')
		expect(stdout).toMatch(MACHINE_LINE_REGEX)
		expect(stdout).toContain('[eslint/ts/no-unused-vars]')
	})

	it('emits an aggregate report on stdout with --format json', async () => {
		await fse.outputFile(
			fixFixtureFile,
			'let fixableVariable = 1\nconst unusedVariable = 2\nexport { fixableVariable }\n',
		)

		const { exitCode, stdout } = await runKscEslintFix(['--format', 'json'])

		expect(exitCode).toBe(1)
		expect(await fse.readFile(fixFixtureFile, 'utf8')).toContain('const fixableVariable')

		const report = JSON.parse(stdout) as LintReport
		expect(report.version).toBe(1)
		expect(report.success).toBe(false)
		expect(report.tools[0]?.name).toBe('eslint')

		const diagnostic = report.diagnostics.find((d) => d.rule === 'ts/no-unused-vars')
		expect(diagnostic).toBeDefined()
		expect(diagnostic?.file).toBe(fixFixtureFileRelative)
		expect(diagnostic?.line).toBe(2)
		// The fixed prefer-const issue is not reported
		expect(report.diagnostics.some((d) => d.rule === 'prefer-const')).toBe(false)
	})
})

describe('native output format', () => {
	it('prefixes output by default', async () => {
		const { exitCode, stdout } = await runKscEslintLint([])

		expect(exitCode).toBe(1)
		expect(stripVTControlCharacters(stdout)).toContain('[ESLint]')
	})
})

describe('mergeVsCodeTasks', () => {
	it('appends new tasks and preserves existing ones', () => {
		const destination = {
			tasks: [{ command: 'echo hi', label: 'my custom task' }],
			version: '2.0.0',
		}
		const source = {
			tasks: [{ command: 'pnpm exec ksc lint --format machine', label: 'ksc lint' }],
			version: '2.0.0',
		}

		const merged = mergeVsCodeTasks(destination, source)

		expect(merged.tasks).toEqual([
			{ command: 'echo hi', label: 'my custom task' },
			{ command: 'pnpm exec ksc lint --format machine', label: 'ksc lint' },
		])
	})

	it('replaces same-label tasks wholesale instead of merging by index', () => {
		const destination = {
			tasks: [
				{ command: 'echo hi', label: 'my custom task' },
				{ command: 'old command', label: 'ksc lint', problemMatcher: ['$tsc'] },
			],
			version: '2.0.0',
		}
		const source = {
			tasks: [{ command: 'new command', label: 'ksc lint' }],
			version: '2.0.0',
		}

		const merged = mergeVsCodeTasks(destination, source)

		expect(merged.tasks).toEqual([
			{ command: 'echo hi', label: 'my custom task' },
			{ command: 'new command', label: 'ksc lint' },
		])
	})

	it('handles a destination without a tasks array', () => {
		const source = {
			tasks: [{ label: 'ksc lint' }],
			version: '2.0.0',
		}

		const merged = mergeVsCodeTasks({}, source)

		expect(merged.version).toBe('2.0.0')
		expect(merged.tasks).toEqual([{ label: 'ksc lint' }])
	})
})
