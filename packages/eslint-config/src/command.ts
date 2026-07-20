import path from 'node:path'
import type {
	CollectContext,
	CollectResult,
	Command,
	CommandDefinition,
} from '../../../src/command-builder.js'
import type { Diagnostic } from '../../../src/diagnostics.js'
import {
	DESCRIPTION,
	executeCommands,
	getCosmiconfigCommand,
} from '../../../src/command-builder.js'
import { normalizeDiagnosticPath, toOutputLines } from '../../../src/diagnostics.js'

async function printEslintConfigCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
): Promise<number> {
	// Conditionally execute different commands based on presence
	// of optional positional argument
	let commandToExecute: Command

	const [firstPositionalArgument] = positionalArguments
	if (firstPositionalArgument === undefined) {
		commandToExecute = getCosmiconfigCommand('eslint')
	} else {
		const resolvedFile = path.join(process.cwd(), firstPositionalArgument)
		logStream.write(`Showing configuration for file: ${resolvedFile}\n`)

		commandToExecute = {
			name: 'eslint',
			optionFlags: ['--print-config'],
			receivePositionalArguments: true,
		}
	}

	const { exitCode } = await executeCommands(logStream, positionalArguments, [], [commandToExecute])
	return exitCode
}

type EslintJsonMessage = {
	column?: number
	endColumn?: number
	endLine?: number
	fatal?: boolean
	line?: number
	message: string
	// eslint-disable-next-line ts/no-restricted-types
	ruleId: null | string
	severity: number
}

type EslintJsonResult = {
	filePath: string
	messages: EslintJsonMessage[]
}

/** Parses `eslint --format json` output into diagnostics. */
export function parseEslintJsonOutput(context: CollectContext): CollectResult {
	let results: EslintJsonResult[]
	try {
		results = JSON.parse(context.stdout) as EslintJsonResult[]
	} catch {
		return {
			diagnostics: [],
			unparsed: [...toOutputLines(context.stdout), ...toOutputLines(context.stderr)],
		}
	}

	const diagnostics: Diagnostic[] = []
	for (const result of results) {
		for (const message of result.messages) {
			diagnostics.push({
				column: message.column,
				endColumn: message.endColumn,
				endLine: message.endLine,
				file: normalizeDiagnosticPath(result.filePath, context.cwd),
				line: message.line,
				message: message.message,
				rule: message.ruleId ?? undefined,
				severity: message.fatal === true || message.severity === 2 ? 'error' : 'warning',
				tool: 'eslint',
			})
		}
	}

	// ESLint's JSON goes to stdout; anything on stderr (e.g. deprecation
	// warnings) is passed through
	return { diagnostics, unparsed: toOutputLines(context.stderr) }
}

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					collect: {
						// The --fix flag must be retained so fixes are still applied
						optionFlags: ['--fix', '--max-warnings', '0', '--format', 'json'],
						parse: parseEslintJsonOutput,
					},
					name: 'eslint',
					// Consider '--concurrency', 'auto'
					// Didn't benchmark particularly fast in September 2025
					// Matching lint's --max-warnings 0 means unfixable warnings fail
					// fix exactly as they'd fail a subsequent lint
					optionFlags: ['--fix', '--max-warnings', '0'],
					receivePositionalArguments: true,
				},
			],
			description: `Fix your project with ESLint. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		init: {
			// ESLint does not support configuration in package.json
			locationOptionFlag: false,
		},
		lint: {
			commands: [
				{
					collect: {
						optionFlags: ['--max-warnings', '0', '--format', 'json'],
						parse: parseEslintJsonOutput,
					},
					name: 'eslint',
					// Consider // Consider '--concurrency', 'auto'
					// Didn't benchmark particularly fast in September 2025
					optionFlags: ['--max-warnings', '0'],
					receivePositionalArguments: true,
				},
			],
			description: `Lint your project with ESLint. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault: '.',
			positionalArgumentMode: 'optional',
		},
		printConfig: {
			commands: [
				{
					execute: printEslintConfigCommand,
					// Explicit name because function names are minified in builds
					name: 'eslint-config',
				},
			],
			description: `Print the effective ESLint configuration. ${DESCRIPTION.optionalFileRun} Use \`@eslint/config-inspector\` for a more detailed view.`,
			positionalArgumentMode: 'optional',
		},
	},
	description: "Kitschpatrol's ESLint shared configuration tools.",
	logColor: 'magenta',
	logPrefix: `[ESLint]`,
	name: 'ksc-eslint',
	order: 4,
}
