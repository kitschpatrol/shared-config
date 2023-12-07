import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDir = path.join(__dirname, "init"); // Replace 'source' with your directory name
const destDir = path.join(process.cwd(), ".vscode"); // Destination directory (project root)

// create .vscode directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir);
}

fs.readdirSync(sourceDir).forEach((file) => {
  const srcPath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);

  // merge with existing, if present
  if (fs.existsSync(destPath)) {
    const srcData = JSON.parse(fs.readFileSync(srcPath, "utf8"));
    const destData = JSON.parse(fs.readFileSync(destPath, "utf8"));

    const mergedData = { ...destData, ...srcData };

    fs.writeFileSync(destPath, JSON.stringify(mergedData, null, 2));

    console.log(`Merged ${file} with the existing file in .vscode folder.`);
  } else {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to .vscode folder.`);
  }
});
