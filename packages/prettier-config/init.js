import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDir = path.join(__dirname, "init"); // Replace 'source' with your directory name
const destDir = process.cwd(); // Destination directory (project root)

fs.readdirSync(sourceDir).forEach((file) => {
  const srcPath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);

  // Copy file to project root if the file doesn't already exist there

  if (!fs.existsSync(destPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to project root.`);
  } else {
    console.log(`${file} already exists in project root, skipping.`);
  }
});
