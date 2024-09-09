/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import jsonColorizer from '@pinojs/json-colorizer';
import type { ArrayMergeOptions, Options } from 'deepmerge';
import deepmerge from 'deepmerge';
import jsonStringifyPrettyCompact from 'json-stringify-pretty-compact';

function stringify(object: unknown): string {
  return jsonColorizer(
    jsonStringifyPrettyCompact(object, {
      indent: 2,
      replacer(_, value) {
        if (typeof value === 'function') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
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

// https://www.npmjs.com/package/deepmerge#arraymerge-example-combine-arrays
const combineMerge = (target: any[], source: any[], options: ArrayMergeOptions): any[] => {
  const destination = [...target];

  for (const [index, item] of source.entries()) {
    if (destination[index] === undefined) {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge(target[index], item, options);
    } else if (!target.includes(item)) {
      destination.push(item);
    }
  }

  return destination;
};

function merge(
  destination: any,
  source: any,
  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  options: Options = { arrayMerge: combineMerge },
): any[] {
  return deepmerge(destination, source, options);
}

export { merge, stringify };
