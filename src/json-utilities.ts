/* eslint-disable ts/no-unsafe-argument */
/* eslint-disable ts/no-unsafe-assignment */
/* eslint-disable ts/no-explicit-any */

import type { ArrayMergeOptions, Options } from 'deepmerge'
import jsonColorizer from '@pinojs/json-colorizer'
import decircular from 'decircular'
import deepmerge from 'deepmerge'
import jsonStringifyPrettyCompact from 'json-stringify-pretty-compact'

// TODO should this merge with logic in command?
function shouldColor(): boolean {
	if (process.env.NO_COLOR !== undefined) {
		return false
	}

	if (process.env.FORCE_COLOR !== undefined) {
		return true
	}

	return process.stdout.isTTY && process.env.TERM !== 'dumb'
}

/** Serialize an object to a colorized, compact JSON string for terminal output. */
export function stringify(object: any): string {
	return shouldColor() ? stringifyColorized(object) : stringifyHelper(object)
}

function stringifyHelper(object: any): string {
	return jsonStringifyPrettyCompact(decircular(object), {
		indent: 2,
		replacer(_, value) {
			if (typeof value === 'function') {
				// eslint-disable-next-line ts/no-unsafe-function-type
				return (value as Function).name
			}

			return value as unknown
		},
	})
}

function stringifyColorized(object: any): string {
	return jsonColorizer(stringifyHelper(object), {
		colors: {
			// eslint-disable-next-line ts/naming-convention
			BRACKET: 'gray',
		},
	})
}

// https://www.npmjs.com/package/deepmerge#arraymerge-example-combine-arrays
const combineMerge = (target: any[], source: any[], options: ArrayMergeOptions): any[] => {
	const destination = [...target]

	for (const [index, item] of source.entries()) {
		if (destination[index] === undefined) {
			destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
		} else if (options.isMergeableObject(item)) {
			destination[index] = merge(target[index], item, options)
		} else if (!target.includes(item)) {
			destination.push(item)
		}
	}

	return destination
}

/** Deep-merge two objects, combining arrays by appending unique elements. */
export function merge(
	destination: any,
	source: any,
	// eslint-disable-next-line unicorn/no-object-as-default-parameter
	options: Options = { arrayMerge: combineMerge },
): any[] {
	return deepmerge(destination, source, options)
}

type VsCodeTask = Record<string, unknown>

function getVsCodeTasks(json: Record<string, unknown>): VsCodeTask[] {
	const { tasks } = json
	return Array.isArray(tasks) ? (tasks as VsCodeTask[]) : []
}

/**
 * Merge VS Code tasks.json files. Top-level keys are shallow-merged, and the
 * `tasks` array is merged by task `label`: a source task replaces a destination
 * task with the same label, otherwise it's appended. Index-based deep merging
 * would splice unrelated tasks together.
 */
export function mergeVsCodeTasks(
	destination: Record<string, unknown>,
	source: Record<string, unknown>,
): Record<string, unknown> {
	const mergedTasks = [...getVsCodeTasks(destination)]
	for (const sourceTask of getVsCodeTasks(source)) {
		const index = mergedTasks.findIndex(
			(task) => task.label !== undefined && task.label === sourceTask.label,
		)
		if (index === -1) {
			mergedTasks.push(sourceTask)
		} else {
			mergedTasks[index] = sourceTask
		}
	}

	return { ...destination, ...source, tasks: mergedTasks }
}
