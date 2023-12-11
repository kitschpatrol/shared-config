#!/usr/bin/env tsx
import camelCase from 'camelcase';
import { execa } from 'execa';
import { globby } from 'globby';
import fs from 'node:fs/promises';

async function getBinNames(): Promise<string[]> {
	const paths = await globby('./packages/*/package.json');

	const names: string[] = [];
	for (const path of paths) {
		const packageJson = JSON.parse(await fs.readFile(path, 'utf8')) as Record<string, unknown>;
		const bin = packageJson.bin as Record<string, string> | undefined;

		if (bin) {
			for (const name of Object.keys(bin)) {
				names.push(name);
			}
		} else {
			console.error(`No bin key found in package.json for ${path}`);
			process.exit(1);
		}
	}

	return names;
}

async function getCapabilities(binName: string): Promise<string[]> {
	const helpText = await execa(binName, ['--help']);

	if (helpText.exitCode !== 0 || helpText.stdout === undefined || helpText.stdout.length === 0) {
		console.error(`Error getting capabilities for ${binName}`);
		process.exit(1);
	}

	const capabilities: string[] = [];
	for (const match of helpText.stdout.matchAll(/--([a-z-]+)/g)) {
		capabilities.push(camelCase(match[1]));
	}

	return capabilities;
}

type Capabilities = Record<string, string[]>;

const capabilities: Capabilities = {};
for (const binName of await getBinNames()) {
	for (const capability of await getCapabilities(binName)) {
		capabilities[capability] = [...(capabilities[capability] ?? []), binName];
	}
}

console.log(`export const capabilities = ${JSON.stringify(capabilities, undefined, 2)};`);
