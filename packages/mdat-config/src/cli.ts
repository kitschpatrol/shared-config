#!/usr/bin/env node
// eslint-disable-next-line import-x/extensions, import-x/no-relative-packages
import { buildCommands } from '../../../src/command-builder.js';

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
