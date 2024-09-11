#!/usr/bin/env node
import { buildCommands } from '$root/src/command-builder.js';

await buildCommands('mdat-config', '[Mdat Config]', 'green', {
  check: {
    command: 'mdat',
    defaultArguments: ['readme.md'],
    options: ['readme', 'check'],
  },
  fix: {
    command: 'mdat',
    defaultArguments: ['readme.md'],
    options: ['readme', 'expand'],
  },
  init: {},
  printConfig: {},
});
