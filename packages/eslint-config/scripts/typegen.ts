/* eslint-disable ts/no-deprecated */
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import fs from 'node:fs/promises'

import {
	astro,
	combine,
	disables,
	html,
	js,
	json,
	jsx,
	md,
	mdx,
	react,
	svelte,
	test,
	toml,
	ts,
	tsx,
	yaml,
} from '../src'

const configs = await combine(
	{
		plugins: {
			// eslint-disable-next-line ts/naming-convention
			'': {
				rules: Object.fromEntries(builtinRules.entries()),
			},
		},
	},
	astro(),
	disables(),
	html(),
	js(),
	json(),
	jsx(),
	md(),
	mdx(),
	react(),
	svelte(),
	test(),
	toml(),
	ts(),
	tsx(),
	yaml(),
)

const configNames = configs.map((index) => index.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
	includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((index) => `'${index}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)
