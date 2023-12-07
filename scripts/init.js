// Copies configuration files for all tools to the root of the project
// It does not overwrite existing files

// Import necessary modules
import { exec as execCallback } from "child_process";
import { promisify } from "util";

const exec = promisify(execCallback);

// Async function to execute a command
async function execCommand(command) {
  try {
    const { stdout, stderr } = await exec(command);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log(stdout);
    return stdout;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error; // Rethrow the error for further handling
  }
}

// Function to run all commands
async function runCommands() {
  try {
    await execCommand("pnpm exec eslint-config-init");
    await execCommand("pnpm exec prettier-config-init");
    await execCommand("pnpm exec stylelint-config-init");
    await execCommand("pnpm exec npm-config-init");
    await execCommand("pnpm exec markdownlint-config-init");
    await execCommand("pnpm exec cspell-config-init");
    await execCommand("pnpm exec vscode-config-init");
    console.log("All configurations have been initialized successfully.");
  } catch (error) {
    console.error(
      "An error occurred while initializing configurations:",
      error
    );
  }
}

// Execute the runCommands function
runCommands();
