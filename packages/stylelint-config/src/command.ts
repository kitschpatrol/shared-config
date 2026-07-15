import path from 'node:path'
import stylelint from 'stylelint'
import type {
	CollectContext,
	CollectResult,
	CommandDefinition,
} from '../../../src/command-builder.js'
import type { Diagnostic } from '../../../src/diagnostics.js'
import { DESCRIPTION, getCosmiconfigResult } from '../../../src/command-builder.js'
import { normalizeDiagnosticPath, toOutputLines } from '../../../src/diagnostics.js'
import { stringify } from '../../../src/json-utilities.js'
import { getCwdOverride, getFilePathAtProjectRoot } from '../../../src/path-utilities.js'

const sharedOptionFlags = [
	'--ignore-path',
	getFilePathAtProjectRoot('.gitignore') ?? '.gitignore',
	'--allow-empty-input',
]
const positionalArgumentDefaultSuffix = [
	'css',
	'scss',
	'sass',
	'svelte',
	'html',
	'astro',
	'tsx',
	'jsx',
	'php',
	'vue',
]
const positionalArgumentDefault = `**/*.{${positionalArgumentDefaultSuffix.join(',')}}`

type StylelintJsonWarning = {
	column?: number
	endColumn?: number
	endLine?: number
	line?: number
	rule?: string
	severity: string
	text: string
}

type StylelintJsonResult = {
	parseErrors?: Array<{ column?: number; line?: number; text: string }>
	source: string
	warnings: StylelintJsonWarning[]
}

/**
 * Parses `stylelint --formatter json` output into diagnostics. Stylelint writes
 * formatter output to stderr, not stdout.
 */
export function parseStylelintJsonOutput(context: CollectContext): CollectResult {
	let results: StylelintJsonResult[]
	try {
		results = JSON.parse(context.stderr) as StylelintJsonResult[]
	} catch {
		return {
			diagnostics: [],
			unparsed: [...toOutputLines(context.stdout), ...toOutputLines(context.stderr)],
		}
	}

	const diagnostics: Diagnostic[] = []
	for (const result of results) {
		const file = normalizeDiagnosticPath(result.source, context.cwd)

		for (const warning of result.warnings) {
			// The rule name is already captured separately, drop it from the text
			const ruleSuffix = warning.rule === undefined ? undefined : ` (${warning.rule})`
			const message =
				ruleSuffix !== undefined && warning.text.endsWith(ruleSuffix)
					? warning.text.slice(0, -ruleSuffix.length)
					: warning.text

			diagnostics.push({
				column: warning.column,
				endColumn: warning.endColumn,
				endLine: warning.endLine,
				file,
				line: warning.line,
				message,
				rule: warning.rule,
				severity: warning.severity === 'warning' ? 'warning' : 'error',
				tool: 'stylelint',
			})
		}

		const parseErrors = result.parseErrors ?? []
		for (const parseError of parseErrors) {
			diagnostics.push({
				column: parseError.column,
				file,
				line: parseError.line,
				message: parseError.text,
				rule: 'parse-error',
				severity: 'error',
				tool: 'stylelint',
			})
		}
	}

	return { diagnostics, unparsed: toOutputLines(context.stdout) }
}

async function printStylelintConfigCommand(
	logStream: NodeJS.WritableStream,
	positionalArguments: string[],
): Promise<number> {
	const configName = 'stylelint'

	// Print location of config:
	const result = await getCosmiconfigResult(configName)
	if (result === undefined) {
		return 1
	}

	const { filepath: configFilepath, isEmpty } = result

	if (isEmpty) {
		logStream.write('Configuration is empty.\n')
		return 0
	}

	logStream.write(`Found ${configName} configuration at "${configFilepath}"\n`)

	// Use stylelint's built-in method to print the config
	let filePath
	const [firstPositionalArgument] = positionalArguments
	if (firstPositionalArgument === undefined) {
		filePath = getCwdOverride('package-dir')
	} else {
		filePath = path.join(process.cwd(), firstPositionalArgument)
		logStream.write(`Showing config for file at "${filePath}"\n`)
	}

	const config = await stylelint.resolveConfig(filePath)
	const prettyAndColorfulJsonLines = stringify(config).split('\n')
	for (const line of prettyAndColorfulJsonLines) {
		logStream.write(`${line}\n`)
	}

	return 0
}

export const commandDefinition: CommandDefinition = {
	commands: {
		fix: {
			commands: [
				{
					collect: {
						// The --fix flag must be retained so fixes are still applied
						optionFlags: [...sharedOptionFlags, '--fix', '--formatter', 'json'],
						parse: parseStylelintJsonOutput,
					},
					name: 'stylelint',
					optionFlags: [...sharedOptionFlags, '--fix'],
					receivePositionalArguments: true,
				},
			],
			description: `Fix your project with Stylelint. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault,
			positionalArgumentMode: 'optional',
		},
		init: {
			configFile: 'stylelint.config.js',
			configPackageJson: {
				stylelint: {
					extends: '@kitschpatrol/stylelint-config',
				},
			},
			locationOptionFlag: true,
		},
		lint: {
			commands: [
				{
					collect: {
						optionFlags: [...sharedOptionFlags, '--formatter', 'json'],
						parse: parseStylelintJsonOutput,
					},
					name: 'stylelint',
					optionFlags: sharedOptionFlags,
					receivePositionalArguments: true,
				},
			],
			description: `Lint your project with Stylelint. ${DESCRIPTION.fileRun}`,
			positionalArgumentDefault,
			positionalArgumentMode: 'optional',
		},
		printConfig: {
			commands: [
				{
					execute: printStylelintConfigCommand,
					// Explicit name because function names are minified in builds
					name: 'stylelint-config',
				},
			],
			description: `Print the effective Stylelint configuration. ${DESCRIPTION.optionalFileRun}.`,
			positionalArgumentMode: 'optional',
		},
	},
	description: "Kitschpatrol's Stylelint shared configuration tools.",
	logColor: 'greenBright',
	logPrefix: '[Stylelint]',
	name: 'ksc-stylelint',
	order: 5,
}
