/* eslint-disable ts/no-unsafe-argument */
/* eslint-disable ts/no-unsafe-assignment */
/* eslint-disable ts/no-explicit-any */

import type { ArrayMergeOptions, Options } from 'deepmerge'
import jsonColorizer from '@pinojs/json-colorizer'
import deepmerge from 'deepmerge'
import jsonStringifyPrettyCompact from 'json-stringify-pretty-compact'

/**
 * TK
 */
export function stringify(object: unknown): string {
	return jsonColorizer(
		jsonStringifyPrettyCompact(object, {
			indent: 2,
			replacer(_, value) {
				if (typeof value === 'function') {
					// eslint-disable-next-line ts/no-unsafe-function-type
					return (value as Function).name
				}

				return value as unknown
			},
		}),
		{
			colors: {
				// eslint-disable-next-line ts/naming-convention
				BRACKET: 'gray',
			},
		},
	)
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

/**
 * TK
 */
export function merge(
	destination: any,
	source: any,
	// eslint-disable-next-line unicorn/no-object-as-default-parameter
	options: Options = { arrayMerge: combineMerge },
): any[] {
	return deepmerge(destination, source, options)
}
