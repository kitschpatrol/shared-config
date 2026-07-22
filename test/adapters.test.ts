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
import {
	createTypeScriptLintCommands,
	createTypeScriptWorkspaceLintCommands,
	isAstroCheckNoise,
	isSvelteCheckNoise,
	parseAstroCheckOutput,
	parseSvelteCheckOutput,
	parseTscOutput,
} from '../packages/typescript-config/src/command.js'
import { createStreamFilter, streamToString } from '../src/stream-utilities.js'

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

	it('counts an unparseable failed run as an error', () => {
		const { diagnostics, unparsed } = parseTscOutput(
			makeContext({ stderr: 'TypeScript failed unexpectedly' }),
		)

		expect(diagnostics).toContainEqual({
			message: 'TypeScript failed unexpectedly',
			severity: 'error',
			tool: 'tsc',
		})
		expect(unparsed).toEqual(['TypeScript failed unexpectedly'])
	})
})

describe('typescript checker plan', () => {
	it('uses Astro JSON logs for collection and filtered human output in native mode', () => {
		const commands = createTypeScriptLintCommands(new Set(['@astrojs/check']))

		expect(commands).toHaveLength(1)
		expect(commands[0]).toMatchObject({
			collect: { optionFlags: ['--json'], parse: parseAstroCheckOutput },
			name: 'astro',
			outputFilter: isAstroCheckNoise,
			subcommands: ['check'],
		})
	})

	it('keeps Svelte scoped to component files when Astro covers the tsconfig', () => {
		const commands = createTypeScriptLintCommands(new Set(['@astrojs/check', 'svelte-check']))

		expect(commands[1]).toMatchObject({
			collect: { optionFlags: ['--output', 'machine-verbose'], parse: parseSvelteCheckOutput },
			name: 'svelte-check',
			optionFlags: [],
		})
	})

	it('passes the tsconfig to both native and collected standalone Svelte checks', () => {
		const commands = createTypeScriptLintCommands(new Set(['svelte-check']))

		expect(commands[0]).toMatchObject({
			collect: {
				optionFlags: ['--tsconfig', './tsconfig.json', '--output', 'machine-verbose'],
				parse: parseSvelteCheckOutput,
			},
			name: 'svelte-check',
			optionFlags: ['--tsconfig', './tsconfig.json'],
		})
	})

	it('runs one plain TypeScript check for an inherited root config', () => {
		const commands = createTypeScriptWorkspaceLintCommands([
			{
				dependencies: new Set(),
				directory: '/workspace',
				hasTypeScriptConfig: true,
			},
			{
				dependencies: new Set(),
				directory: '/workspace/packages/inherited',
				hasTypeScriptConfig: false,
			},
		])

		expect(commands).toHaveLength(1)
		expect(commands[0]).toMatchObject({ cwdOverride: '/workspace', name: 'tsc' })
	})

	it('runs framework checkers from the package that declares them', () => {
		const commands = createTypeScriptWorkspaceLintCommands([
			{
				dependencies: new Set(),
				directory: '/workspace',
				hasTypeScriptConfig: true,
			},
			{
				dependencies: new Set(['svelte-check']),
				directory: '/workspace/packages/site',
				hasTypeScriptConfig: false,
			},
		])

		expect(commands).toHaveLength(2)
		expect(commands[0]).toMatchObject({ cwdOverride: '/workspace', name: 'tsc' })
		expect(commands[1]).toMatchObject({
			cwdOverride: '/workspace/packages/site',
			name: 'svelte-check',
		})
	})

	it('runs every package with its own local tsconfig', () => {
		const commands = createTypeScriptWorkspaceLintCommands([
			{
				dependencies: new Set(),
				directory: '/workspace',
				hasTypeScriptConfig: false,
			},
			{
				dependencies: new Set(),
				directory: '/workspace/packages/a',
				hasTypeScriptConfig: true,
			},
			{
				dependencies: new Set(),
				directory: '/workspace/packages/b',
				hasTypeScriptConfig: true,
			},
		])

		expect(
			commands.map((command) => ({
				cwdOverride: 'cwdOverride' in command ? command.cwdOverride : undefined,
				name: command.name,
			})),
		).toEqual([
			{ cwdOverride: '/workspace/packages/a', name: 'tsc' },
			{ cwdOverride: '/workspace/packages/b', name: 'tsc' },
		])
	})

	it('keeps a missing-config check when no package has a tsconfig', () => {
		const commands = createTypeScriptWorkspaceLintCommands([
			{
				dependencies: new Set(),
				directory: '/workspace',
				hasTypeScriptConfig: false,
			},
		])

		expect(commands).toHaveLength(1)
		expect(commands[0]).toMatchObject({ cwdOverride: '/workspace', name: 'tsc' })
	})
})

describe('astro check adapter', () => {
	it('parses JSON logger warnings and text diagnostics without progress noise', () => {
		const stdout = [
			JSON.stringify({
				label: '@astrojs/cloudflare',
				level: 'info',
				message: 'Enabling compile-time image optimization.',
			}),
			JSON.stringify({
				label: 'adapter',
				level: 'warn',
				message: 'Ensure the image service supports the Workers runtime.',
			}),
			'src/pages/index.astro:12:5 - error ts(2322): Type number is not assignable to string.',
			'12 const title: string = 1',
			'       ~~~~~',
			'Result (34 files):',
			'- 1 error',
			'- 0 warnings',
			'- 0 hints',
		].join('\n')

		const { diagnostics, unparsed } = parseAstroCheckOutput(makeContext({ stdout }))

		expect(diagnostics).toEqual([
			{
				message: 'Ensure the image service supports the Workers runtime.',
				rule: 'adapter',
				severity: 'warning',
				tool: 'astro',
			},
			{
				column: 5,
				file: path.join('src', 'pages', 'index.astro'),
				line: 12,
				message: 'Type number is not assignable to string.',
				rule: 'ts(2322)',
				severity: 'error',
				tool: 'astro',
			},
		])
		expect(unparsed).toEqual([])
	})

	it('falls back to human logger records and counts warnings', () => {
		const stdout = [
			'09:51:22 [content] Syncing content',
			'09:51:22 [WARN] [adapter] Custom image service warning.',
			'Result (34 files):',
			'- 0 errors',
			'- 0 warnings',
			'- 0 hints',
		].join('\n')

		const { diagnostics, unparsed } = parseAstroCheckOutput(makeContext({ exitCode: 0, stdout }))

		expect(diagnostics).toEqual([
			{
				message: 'Custom image service warning.',
				rule: 'adapter',
				severity: 'warning',
				tool: 'astro',
			},
		])
		expect(unparsed).toEqual([])
	})

	it('counts an unparseable failed run as an error', () => {
		const { diagnostics, unparsed } = parseAstroCheckOutput(
			makeContext({ stderr: 'Astro check failed before diagnostics were available.' }),
		)

		expect(diagnostics).toContainEqual({
			message: 'Astro check failed before diagnostics were available.',
			severity: 'error',
			tool: 'astro',
		})
		expect(unparsed).toEqual(['Astro check failed before diagnostics were available.'])
	})

	it('filters progress and result chrome but keeps warnings and diagnostics', () => {
		expect(isAstroCheckNoise('09:51:22 [content] Syncing content')).toBe(true)
		expect(isAstroCheckNoise('09:51:22 [types] Generated 332ms')).toBe(true)
		expect(isAstroCheckNoise('Result (34 files):')).toBe(true)
		expect(isAstroCheckNoise('Result (34 files): ')).toBe(true)
		expect(isAstroCheckNoise('- 0 errors')).toBe(true)
		expect(isAstroCheckNoise('09:51:22 [WARN] [adapter] Keep me')).toBe(false)
		expect(isAstroCheckNoise('src/pages/index.astro:1:1 - error ts(1): Nope')).toBe(false)
	})

	it('leaves only actionable lines in native output', async () => {
		const outputFilter = createStreamFilter(isAstroCheckNoise)
		const output = streamToString(outputFilter)

		outputFilter.end(
			[
				'09:51:22 [content] Syncing content',
				'09:51:22 [WARN] [adapter] Keep me',
				'Result (34 files): ',
				'- 0 errors',
				'- 0 warnings',
				'- 0 hints',
			].join('\n'),
		)

		await expect(output).resolves.toBe('09:51:22 [WARN] [adapter] Keep me\n')
	})
})

describe('svelte-check output filter', () => {
	it('suppresses progress lines and the all-clear summary', () => {
		expect(isSvelteCheckNoise('Loading svelte-check in workspace: /Users/me/project')).toBe(true)
		expect(isSvelteCheckNoise('Getting Svelte diagnostics...')).toBe(true)
		expect(isSvelteCheckNoise('svelte-check found 0 errors and 0 warnings')).toBe(true)
	})

	it('suppresses machine-format chrome on clean runs', () => {
		expect(isSvelteCheckNoise('1784557516651 START "/Users/me/project"')).toBe(true)
		expect(
			isSvelteCheckNoise(
				'1784557516657 COMPLETED 3078 FILES 0 ERRORS 0 WARNINGS 0 FILES_WITH_PROBLEMS',
			),
		).toBe(true)
	})

	it('suppresses the trailing color reset from an all-clear summary', async () => {
		const outputFilter = createStreamFilter(isSvelteCheckNoise)
		const output = streamToString(outputFilter)

		// Svelte-check colors the entire newline-terminated summary, leaving the
		// closing ANSI sequence after the newline as its own buffered line.
		outputFilter.end('\u{1B}[32msvelte-check found 0 errors and 0 warnings\n\u{1B}[39m')

		await expect(output).resolves.toBe('')
	})

	it('keeps diagnostics and summaries that report problems', () => {
		expect(isSvelteCheckNoise('svelte-check found 1 error and 0 warnings in 1 file')).toBe(false)
		expect(isSvelteCheckNoise('svelte-check found 0 errors and 2 warnings in 1 file')).toBe(false)
		expect(isSvelteCheckNoise('====================================')).toBe(false)
		expect(isSvelteCheckNoise('/Users/me/project/src/App.svelte:4:2')).toBe(false)
		expect(isSvelteCheckNoise("Error: Cannot find name 'foo' (ts)")).toBe(false)
		expect(
			isSvelteCheckNoise(
				'1784557516657 COMPLETED 10 FILES 2 ERRORS 0 WARNINGS 1 FILES_WITH_PROBLEMS',
			),
		).toBe(false)
		expect(
			isSvelteCheckNoise('1784557516655 ERROR "src/App.svelte" 1:1 "Cannot find name \'foo\'"'),
		).toBe(false)
	})
})

describe('svelte-check adapter', () => {
	it('parses machine-verbose diagnostics and ignores completion chrome', () => {
		const stdout = [
			'1784557516651 START "/Users/me/project"',
			`1784557516652 ${JSON.stringify({
				code: 2322,
				end: { character: 9, line: 3 },
				filename: 'src/App.svelte',
				message: 'Type number is not assignable to string.',
				source: 'ts',
				start: { character: 1, line: 3 },
				type: 'ERROR',
			})}`,
			`1784557516653 ${JSON.stringify({
				filename: 'src/App.svelte',
				message: 'Unused CSS selector',
				source: 'css',
				start: { character: 0, line: 8 },
				type: 'WARNING',
			})}`,
			'1784557516657 COMPLETED 10 FILES 1 ERRORS 1 WARNINGS 1 FILES_WITH_PROBLEMS',
		].join('\n')

		const { diagnostics, unparsed } = parseSvelteCheckOutput(makeContext({ stdout }))

		expect(diagnostics).toEqual([
			{
				column: 2,
				endColumn: 10,
				endLine: 4,
				file: path.join('src', 'App.svelte'),
				line: 4,
				message: 'Type number is not assignable to string.',
				rule: 'ts(2322)',
				severity: 'error',
				tool: 'svelte-check',
			},
			{
				column: 1,
				file: path.join('src', 'App.svelte'),
				line: 9,
				message: 'Unused CSS selector',
				rule: 'css',
				severity: 'warning',
				tool: 'svelte-check',
			},
		])
		expect(unparsed).toEqual([])
	})

	it('treats machine failures as errors even if svelte-check exits zero', () => {
		const { diagnostics, unparsed } = parseSvelteCheckOutput(
			makeContext({ exitCode: 0, stdout: '1784557516657 FAILURE "Language server crashed"' }),
		)

		expect(diagnostics).toEqual([
			{ message: 'Language server crashed', severity: 'error', tool: 'svelte-check' },
		])
		expect(unparsed).toEqual([])
	})

	it('supports compact machine output as a compatibility fallback', () => {
		const { diagnostics } = parseSvelteCheckOutput(
			makeContext({
				stdout: String.raw`1784557516655 ERROR "src/App.svelte" 1:2 "Cannot find name \"foo\""`,
			}),
		)

		expect(diagnostics[0]).toMatchObject({
			column: 2,
			file: path.join('src', 'App.svelte'),
			line: 1,
			message: 'Cannot find name "foo"',
			severity: 'error',
		})
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
