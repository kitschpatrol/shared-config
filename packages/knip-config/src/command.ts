import path from 'node:path'
import type {
	CollectContext,
	CollectResult,
	CommandDefinition,
} from '../../../src/command-builder.js'
import type { Diagnostic } from '../../../src/diagnostics.js'
import { DESCRIPTION, getCosmiconfigCommand } from '../../../src/command-builder.js'
import { normalizeDiagnosticPath, toOutputLines } from '../../../src/diagnostics.js'
import { getPackageDirectory, getWorkspaceRoot, isMonorepo } from '../../../src/path-utilities.js'
import sharedKnipConfig from './index.js'

/** Human-readable labels for Knip's issue categories. */
const KNIP_CATEGORY_LABELS: Record<string, string> = {
	binaries: 'Unlisted binary',
	catalog: 'Unused catalog entry',
	classMembers: 'Unused class member',
	dependencies: 'Unused dependency',
	devDependencies: 'Unused devDependency',
	duplicates: 'Duplicate export',
	enumMembers: 'Unused enum member',
	exports: 'Unused export',
	files: 'Unused file',
	namespaceMembers: 'Unused namespace member',
	nsExports: 'Unused namespace export',
	nsTypes: 'Unused namespace type',
	optionalPeerDependencies: 'Unused optional peer dependency',
	types: 'Unused exported type',
	unlisted: 'Unlisted dependency',
	unresolved: 'Unresolved import',
}

type KnipIssueEntry = string | { col?: number; line?: number; name: string }

type KnipIssue = Record<string, unknown> & { file: string }

function flattenKnipEntries(value: unknown): KnipIssueEntry[] {
	if (!Array.isArray(value)) {
		return []
	}

	// Some categories (e.g. duplicates) nest entries one level deeper
	return value.flatMap((entry: unknown) =>
		Array.isArray(entry) ? (entry as KnipIssueEntry[]) : [entry as KnipIssueEntry],
	)
}

/** Parses `knip --reporter json` output into diagnostics. */
export function parseKnipJsonOutput(context: CollectContext): CollectResult {
	let parsed: { issues?: KnipIssue[] }
	try {
		parsed = JSON.parse(context.stdout) as { issues?: KnipIssue[] }
	} catch {
		return {
			diagnostics: [],
			unparsed: [...toOutputLines(context.stdout), ...toOutputLines(context.stderr)],
		}
	}

	const diagnostics: Diagnostic[] = []
	const issues = parsed.issues ?? []
	for (const issue of issues) {
		const file = normalizeDiagnosticPath(issue.file, context.cwd)

		for (const [category, value] of Object.entries(issue)) {
			const label = KNIP_CATEGORY_LABELS[category]
			if (label !== undefined) {
				for (const entry of flattenKnipEntries(value)) {
					const name = typeof entry === 'string' ? entry : entry.name
					const location = typeof entry === 'string' ? {} : { column: entry.col, line: entry.line }

					diagnostics.push({
						...location,
						file,
						message: category === 'files' ? label : `${label}: ${name}`,
						rule: category,
						severity: 'warning',
						tool: 'knip',
					})
				}
			}
		}
	}

	return { diagnostics, unparsed: toOutputLines(context.stderr) }
}

function getWorkspaceOptionFlags(): string[] {
	if (isMonorepo()) {
		// Are we in a subpackage of the monorepo?
		const packageDirectory = getPackageDirectory()
		const workspaceRoot = getWorkspaceRoot()
		if (packageDirectory !== workspaceRoot) {
			// Yes, we are in a subpackage
			const packagePath = path.relative(workspaceRoot, packageDirectory)
			if (packagePath !== '') {
				// Knip uses POSIX paths internally for workspace names,
				// so convert Windows backslashes to forward slashes
				return ['--workspace', packagePath.split(path.sep).join('/')]
			}
		}
	}

	return []
}

function getKnipPackageJsonObject(): Record<string, unknown> {
	// Possibly brittle if dynamic stuff happens in the future
	return {
		// Doesn't work
		// knip: '@kitschpatrol/knip-config',
		knip: sharedKnipConfig,
	}
}

export const commandDefinition: CommandDefinition = {
	commands: {
		// In practice, Knip's auto-fix behavior is too dangerous for most projects.
		// Since ksc doesn't currently have per-tool configuration options, we'll
		// just disable `ksc-knip fix` for now.
		//
		// fix: {
		// 	commands: [
		// 		{
		// 			cwdOverride: 'workspace-root',
		// 			name: 'knip',
		// 			optionFlags: [
		// 				'--fix',
		// 				'--allow-remove-files',
		// 				'--no-config-hints',
		// 				...getWorkspaceOptionFlags(),
		// 			],
		// 		},
		// 	],
		// 	description: `Automatically remove unused code and dependencies. ${DESCRIPTION.packageRun} ${DESCRIPTION.monorepoRun}`,
		// 	positionalArgumentMode: 'none',
		// },
		init: {
			configFile: 'knip.config.ts',
			configPackageJson: getKnipPackageJsonObject(),
			locationOptionFlag: true, // Knip doesn't support references to config files in package.json?
		},
		lint: {
			commands: [
				{
					collect: {
						optionFlags: [
							'--no-progress',
							'--no-config-hints',
							...getWorkspaceOptionFlags(),
							'--reporter',
							'json',
						],
						parse: parseKnipJsonOutput,
					},
					// Run from root, then pass --workspace IF in a monorepo and called from a subpackage
					cwdOverride: 'workspace-root',
					name: 'knip',
					optionFlags: ['--no-progress', '--no-config-hints', ...getWorkspaceOptionFlags()],
				},
				// "Production" pass is not worth it?
				// {
				// 	command: 'knip',
				// 	logColor: 'cyanBright',
				// 	logPrefix: '[Production]',
				// 	optionFlags: ['--no-progress', '--production'],
				// },
			],
			description: `Check for unused code and dependencies. ${DESCRIPTION.packageRun} ${DESCRIPTION.monorepoRun}`,
			positionalArgumentMode: 'none',
		},
		printConfig: {
			commands: [getCosmiconfigCommand('knip')],
			description: `Print the effective Knip configuration. ${DESCRIPTION.packageSearch} ${DESCRIPTION.monorepoSearch}`,
			positionalArgumentMode: 'none',
		},
	},
	description: "Kitschpatrol's Knip shared configuration tools.",
	logColor: 'cyan',
	logPrefix: '[Knip]',
	name: 'ksc-knip',
	order: 7,
}
