import path from 'node:path'
import { PassThrough } from 'node:stream'
import { describe, expect, it } from 'vitest'
import type { Command, CommandFunction, CommandGroup } from '../src/command-builder.js'
import { commandDefinition as sharedCommandDefinition } from '../packages/shared-config/src/command.js'
import { executeCommands } from '../src/command-builder.js'

function createLogStream(): PassThrough {
	const stream = new PassThrough()
	stream.resume()
	return stream
}

async function delay(milliseconds: number): Promise<void> {
	await new Promise((resolve) => {
		setTimeout(resolve, milliseconds)
	})
}

function createTrackedCommand(
	name: string,
	run: () => Promise<number>,
	stage?: number,
): CommandFunction {
	return {
		async execute() {
			return run()
		},
		name,
		stage,
	}
}

function createGroup(name: string, commands: Command[], stage?: number): CommandGroup {
	return {
		commands,
		kind: 'group',
		name,
		parallel: true,
		positionalArgumentMode: 'none',
		stage,
		subcommand: 'lint',
	}
}

function createCollectedCommand(
	name: string,
	milliseconds: number,
	exitCode: number,
): CommandFunction {
	return {
		async collect() {
			await delay(milliseconds)
			return { diagnostics: [], exitCode, unparsed: [] }
		},
		async execute() {
			await delay(0)
			return exitCode
		},
		name,
	}
}

describe('command scheduler', () => {
	it('declares strict fixer stages and a shared final read-only stage', () => {
		const fixCommands = sharedCommandDefinition.commands.fix?.commands
		expect(Array.isArray(fixCommands)).toBe(true)
		const groups = fixCommands as CommandGroup[]

		expect(groups.map(({ name, stage }) => [name, stage])).toEqual([
			['ksc-repo', 0],
			['ksc-mdat', 1],
			['ksc-eslint', 2],
			['ksc-stylelint', 3],
			['ksc-cspell', 4],
			['ksc-prettier', 5],
			['ksc-typescript', 6],
			['ksc-knip', 6],
		])
		expect(groups.find(({ name }) => name === 'ksc-mdat')?.parallel).toBe(true)
		expect(
			groups.filter(({ stage }) => stage !== 6).every(({ stage }, index) => stage === index),
		).toBe(true)
	})

	it('enforces one global worker cap across nested groups', async () => {
		let active = 0
		let maximumActive = 0
		const tracked = (name: string) =>
			createTrackedCommand(name, async () => {
				active += 1
				maximumActive = Math.max(maximumActive, active)
				await delay(15)
				active -= 1
				return 0
			})

		const groups = [
			createGroup('group-a', [tracked('a1'), tracked('a2'), tracked('a3')]),
			createGroup('group-b', [tracked('b1'), tracked('b2'), tracked('b3')]),
		]

		const result = await executeCommands(
			createLogStream(),
			[],
			[],
			groups,
			undefined,
			undefined,
			undefined,
			{ concurrency: 2, format: 'native', parallel: true },
		)

		expect(result.exitCode).toBe(0)
		expect(maximumActive).toBe(2)
	})

	it('gives sibling groups a worker before queueing a wide parallel backlog', async () => {
		const starts: string[] = []
		const tracked = (name: string) =>
			createTrackedCommand(name, async () => {
				starts.push(name)
				await delay(10)
				return 0
			})
		const serialGroup: CommandGroup = {
			commands: [tracked('eslint')],
			kind: 'group',
			name: 'eslint-group',
			positionalArgumentMode: 'none',
			subcommand: 'lint',
		}

		await executeCommands(
			createLogStream(),
			[],
			[],
			[
				createGroup('mdat-group', [tracked('mdat-1'), tracked('mdat-2'), tracked('mdat-3')]),
				serialGroup,
			],
			undefined,
			undefined,
			undefined,
			{ concurrency: 2, format: 'native', parallel: true },
		)

		expect(starts.slice(0, 2).toSorted()).toEqual(['eslint', 'mdat-1'])
	})

	it('honors stage barriers while allowing same-stage read-only work', async () => {
		const events: string[] = []
		const tracked = (name: string, stage: number, milliseconds: number) =>
			createTrackedCommand(
				name,
				async () => {
					events.push(`${name}:start`)
					await delay(milliseconds)
					events.push(`${name}:end`)
					return 0
				},
				stage,
			)

		await executeCommands(
			createLogStream(),
			[],
			[],
			[
				tracked('metadata', 0, 10),
				tracked('source-fixer', 1, 10),
				tracked('typescript', 2, 15),
				tracked('knip', 2, 15),
			],
			undefined,
			undefined,
			undefined,
			{ concurrency: 4, format: 'native', parallel: true },
		)

		expect(events.indexOf('source-fixer:start')).toBeGreaterThan(events.indexOf('metadata:end'))
		expect(events.indexOf('typescript:start')).toBeGreaterThan(events.indexOf('source-fixer:end'))
		expect(events.slice(4, 6).toSorted()).toEqual(['knip:start', 'typescript:start'])
	})

	it('uses wholly serial declaration order when concurrency is one', async () => {
		const starts: string[] = []
		const tracked = (name: string) =>
			createTrackedCommand(name, async () => {
				starts.push(name)
				await delay(1)
				return 0
			})

		await executeCommands(
			createLogStream(),
			[],
			[],
			[
				createGroup('group-a', [tracked('a1'), tracked('a2')]),
				createGroup('group-b', [tracked('b1'), tracked('b2')]),
			],
			undefined,
			undefined,
			undefined,
			{ concurrency: 1, format: 'native', parallel: true },
		)

		expect(starts).toEqual(['a1', 'a2', 'b1', 'b2'])
	})

	it('aggregates failures and keeps JSON tool ordering deterministic', async () => {
		const result = await executeCommands(
			createLogStream(),
			[],
			[],
			[
				createCollectedCommand('slow-success', 20, 0),
				createCollectedCommand('fast-failure', 1, 1),
				createCollectedCommand('last', 1, 0),
			],
			undefined,
			undefined,
			undefined,
			{ concurrency: 3, format: 'json', parallel: true },
		)

		expect(result.exitCode).toBe(1)
		expect(result.report?.success).toBe(false)
		expect(result.report?.tools.map(({ name }) => name)).toEqual([
			'slow-success',
			'fast-failure',
			'last',
		])
	})

	it('skips a nested tool group without starting its leaves', async () => {
		const starts: string[] = []
		const tracked = (name: string) =>
			createTrackedCommand(name, async () => {
				starts.push(name)
				await delay(0)
				return 0
			})

		const result = await executeCommands(
			createLogStream(),
			[],
			[],
			[
				createGroup('ksc-eslint', [tracked('eslint')]),
				createGroup('ksc-prettier', [tracked('prettier')]),
			],
			undefined,
			true,
			['eslint'],
			{ concurrency: 2, format: 'native', parallel: true },
		)

		expect(result.exitCode).toBe(0)
		expect(starts).toEqual(['prettier'])
	})
})

describe('tool-native cache arguments', () => {
	const printArgumentsScript = 'process.stdout.write(JSON.stringify(process.argv.slice(1)))'
	const cacheCommand: Command = {
		cache: { flags: ['--cache', '--cache-strategy', 'content'], name: 'test-tool' },
		name: process.execPath,
		optionFlags: ['-e', printArgumentsScript, '--'],
	}

	it('adds the shared workspace cache location when enabled', async () => {
		const result = await executeCommands(
			createLogStream(),
			[],
			[],
			[cacheCommand],
			undefined,
			undefined,
			undefined,
			{ cache: true, format: 'json' },
		)

		expect(result.report?.tools[0]?.unparsed).toEqual([
			JSON.stringify([
				'--cache',
				'--cache-strategy',
				'content',
				'--cache-location',
				path.join(process.cwd(), 'node_modules', '.cache', 'ksc', 'test-tool'),
			]),
		])
	})

	it('passes no cache arguments when disabled', async () => {
		const result = await executeCommands(
			createLogStream(),
			[],
			[],
			[cacheCommand],
			undefined,
			undefined,
			undefined,
			{ cache: false, format: 'json' },
		)

		expect(result.report?.tools[0]?.unparsed).toEqual(['[]'])
	})
})
