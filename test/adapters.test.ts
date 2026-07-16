// Fixture strings intentionally contain misspellings and case errors
/* cspell:disable */
// @case-police-disable
import path from 'node:path'
import process from 'node:process'
import { describe, expect, it } from 'vitest'
import type { CollectContext } from '../src/command-builder.js'
import { parseCasePoliceOutput, parseCspellOutput } from '../packages/cspell-config/src/command.js'
import { parseEslintJsonOutput } from '../packages/eslint-config/src/command.js'
import { parseKnipJsonOutput } from '../packages/knip-config/src/command.js'
import { parsePrettierOutput } from '../packages/prettier-config/src/command.js'
import { parseStylelintJsonOutput } from '../packages/stylelint-config/src/command.js'
import { parseTscOutput } from '../packages/typescript-config/src/command.js'

function makeContext(partial: Partial<CollectContext>): CollectContext {
	return {
		cwd: process.cwd(),
		exitCode: 1,
		stderr: '',
		stdout: '',
		...partial,
	}
}

describe('tsc adapter', () => {
	it('parses file, global, and continuation lines', () => {
		const stdout = [
			"src/foo.ts(12,5): error TS2304: Cannot find name 'x'.",
			"src/bar.ts(3,1): error TS2322: Type 'number' is not assignable to type 'string'.",
			"  Types of property 'a' are incompatible.",
			"error TS5083: Cannot read file 'tsconfig.json'.",
			'some unexpected line',
		].join('\n')

		const { diagnostics, unparsed } = parseTscOutput(makeContext({ stdout }))

		expect(diagnostics).toHaveLength(3)
		expect(diagnostics[0]).toMatchObject({
			column: 5,
			file: path.join('src', 'foo.ts'),
			line: 12,
			message: "Cannot find name 'x'.",
			rule: 'TS2304',
			severity: 'error',
			tool: 'tsc',
		})
		// Continuation line is folded into the previous diagnostic
		expect(diagnostics[1]?.message).toBe(
			"Type 'number' is not assignable to type 'string'.\nTypes of property 'a' are incompatible.",
		)
		// Global diagnostics have no file
		expect(diagnostics[2]).toMatchObject({ rule: 'TS5083', severity: 'error' })
		expect(diagnostics[2]?.file).toBeUndefined()
		expect(unparsed).toEqual(['some unexpected line'])
	})

	it('resolves paths relative to the tool cwd', () => {
		const toolCwd = path.join(process.cwd(), 'packages', 'example')
		const stdout = 'src/foo.ts(1,1): error TS2304: Nope.'

		const { diagnostics } = parseTscOutput(makeContext({ cwd: toolCwd, stdout }))

		expect(diagnostics[0]?.file).toBe(path.join('packages', 'example', 'src', 'foo.ts'))
	})
})

describe('eslint adapter', () => {
	it('parses eslint --format json output', () => {
		const stdout = JSON.stringify([
			{
				filePath: path.join(process.cwd(), 'src', 'foo.ts'),
				messages: [
					{
						column: 7,
						endColumn: 21,
						endLine: 1,
						line: 1,
						message: "'x' is assigned a value but never used.",
						ruleId: 'ts/no-unused-vars',
						severity: 2,
					},
					{
						column: 1,
						line: 2,
						message: 'Unexpected console statement.',
						ruleId: 'no-console',
						severity: 1,
					},
					{
						column: 1,
						fatal: true,
						line: 3,
						message: 'Parsing error: Unexpected token',
						// eslint-disable-next-line unicorn/no-null -- ESLint emits null rule ids
						ruleId: null,
						severity: 2,
					},
				],
			},
		])

		const { diagnostics, unparsed } = parseEslintJsonOutput(makeContext({ stdout }))

		expect(diagnostics).toHaveLength(3)
		expect(diagnostics[0]).toMatchObject({
			column: 7,
			endColumn: 21,
			endLine: 1,
			file: path.join('src', 'foo.ts'),
			line: 1,
			rule: 'ts/no-unused-vars',
			severity: 'error',
			tool: 'eslint',
		})
		expect(diagnostics[1]?.severity).toBe('warning')
		expect(diagnostics[2]?.severity).toBe('error')
		expect(diagnostics[2]?.rule).toBeUndefined()
		expect(unparsed).toEqual([])
	})

	it('passes through unparseable output', () => {
		const { diagnostics, unparsed } = parseEslintJsonOutput(
			makeContext({ stderr: 'a warning', stdout: 'not json' }),
		)

		expect(diagnostics).toEqual([])
		expect(unparsed).toEqual(['not json', 'a warning'])
	})
})

describe('stylelint adapter', () => {
	it('parses stylelint --formatter json output from stderr', () => {
		const stderr = JSON.stringify([
			{
				source: path.join(process.cwd(), 'src', 'style.css'),
				warnings: [
					{
						column: 2,
						endColumn: 8,
						endLine: 2,
						line: 2,
						rule: 'property-no-unknown',
						severity: 'error',
						text: 'Unknown property "colorz" (property-no-unknown)',
					},
				],
			},
		])

		const { diagnostics, unparsed } = parseStylelintJsonOutput(makeContext({ stderr }))

		expect(diagnostics).toHaveLength(1)
		expect(diagnostics[0]).toMatchObject({
			column: 2,
			file: path.join('src', 'style.css'),
			line: 2,
			// Rule suffix is stripped from the text since it's captured separately
			message: 'Unknown property "colorz"',
			rule: 'property-no-unknown',
			severity: 'error',
			tool: 'stylelint',
		})
		expect(unparsed).toEqual([])
	})
})

describe('cspell adapter', () => {
	it('parses issue lines with and without fix suggestions', () => {
		const stdout = [
			'src/foo.ts:12:5 - Unknown word (documnet) fix: (document)',
			'readme.md:3:1 - Unknown word (kitschpatrol)',
			'something unexpected',
		].join('\n')

		const { diagnostics, unparsed } = parseCspellOutput(makeContext({ stdout }))

		expect(diagnostics).toHaveLength(2)
		expect(diagnostics[0]).toMatchObject({
			column: 5,
			file: path.join('src', 'foo.ts'),
			line: 12,
			message: 'Unknown word (documnet)',
			severity: 'warning',
			suggestion: 'document',
			tool: 'cspell',
		})
		expect(diagnostics[1]?.message).toBe('Unknown word (kitschpatrol)')
		expect(diagnostics[1]?.suggestion).toBeUndefined()
		expect(unparsed).toEqual(['something unexpected'])
	})
})

describe('case-police adapter', () => {
	it('parses recommendation lines and drops banner noise', () => {
		const stdout = [
			' Case  Police  v2.2.1',
			'240 files found for checking, 488 words loaded',
			'Github → GitHub \t ./src/command.ts:63:27',
			'1 files contain case errors',
			'run npx case-police --fix to fix',
		].join('\n')

		const { diagnostics, unparsed } = parseCasePoliceOutput(makeContext({ stdout }))

		expect(diagnostics).toHaveLength(1)
		expect(diagnostics[0]).toMatchObject({
			column: 27,
			file: path.join('src', 'command.ts'),
			line: 63,
			message: 'Case error: "Github" should be "GitHub"',
			severity: 'warning',
			suggestion: 'GitHub',
			tool: 'case-police',
		})
		expect(unparsed).toEqual([])
	})
})

describe('prettier adapter', () => {
	it('parses warn and error lines and drops the summary', () => {
		const stdout = [
			'[warn] src/foo.ts',
			'[warn] Code style issues found in 1 file. Run Prettier with --write to fix.',
			'[error] src/bad.rb: Error: Ruby version 2.6 required',
		].join('\n')

		const { diagnostics, unparsed } = parsePrettierOutput(makeContext({ stdout }))

		expect(diagnostics).toHaveLength(2)
		expect(diagnostics[0]).toMatchObject({
			file: path.join('src', 'foo.ts'),
			message: 'File is not formatted with Prettier',
			severity: 'warning',
			tool: 'prettier',
		})
		expect(diagnostics[0]?.line).toBeUndefined()
		expect(diagnostics[1]).toMatchObject({
			message: 'src/bad.rb: Error: Ruby version 2.6 required',
			severity: 'error',
		})
		expect(unparsed).toEqual([])
	})
})

describe('knip adapter', () => {
	it('parses knip --reporter json output across categories', () => {
		const stdout = JSON.stringify({
			issues: [
				{
					dependencies: [{ name: 'left-pad' }],
					exports: [{ col: 14, line: 16, name: 'unusedThing', pos: 405 }],
					file: 'src/foo.ts',
					files: [],
				},
				{
					exports: [],
					file: 'src/orphan.ts',
					files: [{ name: 'src/orphan.ts' }],
				},
			],
		})

		const { diagnostics, unparsed } = parseKnipJsonOutput(makeContext({ stdout }))

		expect(diagnostics).toHaveLength(3)
		expect(diagnostics).toContainEqual(
			expect.objectContaining({
				column: 14,
				file: path.join('src', 'foo.ts'),
				line: 16,
				message: 'Unused export: unusedThing',
				rule: 'exports',
				severity: 'warning',
				tool: 'knip',
			}),
		)
		expect(diagnostics).toContainEqual(
			expect.objectContaining({
				message: 'Unused dependency: left-pad',
				rule: 'dependencies',
			}),
		)
		expect(diagnostics).toContainEqual(
			expect.objectContaining({
				file: path.join('src', 'orphan.ts'),
				message: 'Unused file',
				rule: 'files',
			}),
		)
		expect(unparsed).toEqual([])
	})

	it('resolves paths relative to the workspace root cwd', () => {
		const workspaceRoot = path.join(process.cwd(), '..')
		const stdout = JSON.stringify({
			issues: [{ exports: [{ col: 1, line: 1, name: 'x' }], file: 'thing/src/a.ts' }],
		})

		const { diagnostics } = parseKnipJsonOutput(makeContext({ cwd: workspaceRoot, stdout }))

		expect(diagnostics[0]?.file).toBe(path.join('..', 'thing', 'src', 'a.ts'))
	})
})
