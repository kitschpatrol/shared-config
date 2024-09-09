#!/usr/bin/env tsx
import { build } from 'esbuild';

await build({
  bundle: true,
  entryPoints: ['src/cli.ts'],
  external: ['execa', '@pinojs/json-colorizer', 'cosmiconfig', 'fs-extra'],
  format: 'esm',
  minify: true,
  outfile: 'bin/cli.js',
  platform: 'node',
  target: 'node18',
});
