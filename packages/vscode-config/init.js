import console from 'node:console';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDirectory = path.join(__dirname, 'init');
const destinationDirectory = path.join(process.cwd(), '.vscode'); // (project root)

// create .vscode directory if it doesn't exist
if (!fs.existsSync(destinationDirectory)) {
	fs.mkdirSync(destinationDirectory);
}

for (const file of fs.readdirSync(sourceDirectory)) {
	const sourcePath = path.join(sourceDirectory, file);
	const destinationPath = path.join(destinationDirectory, file);

	// merge with existing, if present
	if (fs.existsSync(destinationPath)) {
		const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
		const destinationData = JSON.parse(fs.readFileSync(destinationPath, 'utf8'));

		const mergedData = { ...destinationData, ...sourceData };

		fs.writeFileSync(destinationPath, JSON.stringify(mergedData, undefined, 2));

		console.log(`Merged ${file} with the existing file in .vscode folder.`);
	} else {
		fs.copyFileSync(sourcePath, destinationPath);
		console.log(`Copied ${file} to .vscode folder.`);
	}
}
