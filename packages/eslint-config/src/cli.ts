#!/usr/bin/env node
// eslint-disable-next-line import-x/no-relative-packages
import { buildCommands, executeJsonOutput } from '../../../src/command-builder.ts';

await buildCommands('eslint-config', `[ESLint]`, 'magenta', {
  check: {
    command: 'eslint',
    defaultArguments: ['.'],
  },
  fix: {
    command: 'eslint',
    defaultArguments: ['.'],
    options: ['--fix'],
  },
  init: {},
  printConfig: {
    async command(logStream, args) {
      return executeJsonOutput(
        logStream,
        {
          command: 'eslint',
          options: ['--print-config'],
        },
        args,
      );
    },
  },
});
