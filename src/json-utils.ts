import jsonColorizer from '@pinojs/json-colorizer';
import jsonStringifyPrettyCompact from 'json-stringify-pretty-compact';

export function stringify(object: unknown): string {
	return jsonColorizer(
		jsonStringifyPrettyCompact(object, {
			indent: 2,
			replacer(key, value) {
				if (typeof value === 'function') {
					// eslint-disable-next-line @typescript-eslint/ban-types
					return (value as Function).name;
				}

				return value as unknown;
			},
		}),
		{
			/* eslint-disable @typescript-eslint/naming-convention */
			colors: {
				BRACKET: 'gray',
			},
		},
	);
}
