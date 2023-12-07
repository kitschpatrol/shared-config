import console from 'node:console';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDirectory = path.join(__dirname, 'init');
const destinationDirectory = process.cwd(); // (project root)

for (const file of fs.readdirSync(sourceDirectory)) {
	const sourcePath = path.join(sourceDirectory, file);
	const destinationPath = path.join(destinationDirectory, file);

	if (fs.existsSync(destinationPath)) {
		console.log(`${file} already exists in project root, skipping.`);
	} else {
		fs.copyFileSync(sourcePath, destinationPath);
		console.log(`Copied ${file} to project root.`);
	}
}
