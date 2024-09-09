#!/usr/bin/env node
import { buildCommands } from '$root/src/command-builder.ts';

// TODO bad idea?
// At least test the ruby situation
const sharedOptions = [
  '--log-level=warn',
  '--plugin=@prettier/plugin-php',
  '--plugin=@prettier/plugin-xml',
  '--plugin=prettier-plugin-pkg',
  '--plugin=prettier-plugin-sh',
  '--plugin=prettier-plugin-svelte',
  '--plugin=prettier-plugin-tailwindcss',
];

await buildCommands('prettier-config', '[Prettier]', 'blue', {
  check: {
    command: 'prettier',
    defaultArguments: ['.'],
    options: [...sharedOptions, '--check'],
  },
  fix: {
    command: 'prettier',
    defaultArguments: ['.'],
    options: [...sharedOptions, '--write'],
  },
  init: {},
  printConfig: {},
});
