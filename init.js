const { exec } = require("child_process");

function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

async function runCommands() {
  try {
    await execCommand("pnpm init-eslint-config");
    await execCommand("pnpm init-prettier-config");
    await execCommand("pnpm init-stylelint-config");
    await execCommand("pnpm init-npm-config");
    console.log("All configurations have been initialized successfully.");
  } catch (error) {
    console.error(
      "An error occurred while initializing configurations:",
      error
    );
  }
}

runCommands();
