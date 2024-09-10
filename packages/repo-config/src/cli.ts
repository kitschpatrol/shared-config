#!/usr/bin/env node
import { buildCommands } from '$root/src/command-builder.js';
import fse from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { packageUp } from 'package-up';

await buildCommands('repo-config', '[Repo Config]', 'gray', {
  init: {},
  printConfig: {
    async command(logStream) {
      const destinationPackage = await packageUp();
      if (destinationPackage === undefined) {
        logStream.write(
          'Error: The `--print-config` flag must be used in a directory with a package.json file somewhere above it\n',
        );
        return 1;
      }

      const sourcePackage = await packageUp({ cwd: fileURLToPath(import.meta.url) });
      if (sourcePackage === undefined) {
        logStream.write('Error: The script being called was not in a package, weird.\n');
        return 1;
      }

      const sourceDirectory = path.join(path.dirname(sourcePackage), 'init/');
      const destinationDirectory = path.dirname(destinationPackage);

      let exitCode = 0;

      for (const file of await fse.readdir(sourceDirectory)) {
        const destinationPath = path.join(destinationDirectory, file);

        // Merge with existing, if present
        if (await fse.exists(destinationPath)) {
          const fileContent = await fse.readFile(destinationPath, 'utf8');
          logStream.write(`💾 Contents of "${file}":\n`);
          logStream.write(fileContent);
          logStream.write('\n');
        } else {
          logStream.write(`Error: Could not find ${file}\n`);
          exitCode = 1;
        }
      }

      return exitCode;
    },
  },
});
