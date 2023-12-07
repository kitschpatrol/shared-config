// Helper to run multiple commands

import { spawn } from "child_process";
import { once } from "events";

const commands = stylePrefixes([
  {
    command: "ESLint .",
    prefix: "ESLint",
    fixArgument: "--fix",
    lintArgument: "",
  },
  // Other commands...
  {
    command:
      'stylelint --allow-empty-input "**/*.{css,scss,sass,svelte,html,astro}"',
    prefix: "StyleLint",
    fixArgument: "--fix",
    lintArgument: "",
  },
  {
    command:
      "prettier --plugin=@prettier/plugin-php --plugin=@prettier/plugin-ruby --plugin=@prettier/plugin-xml --plugin=prettier-plugin-astro --plugin=prettier-plugin-pkg --plugin=prettier-plugin-sh --plugin=prettier-plugin-sql --plugin=prettier-plugin-svelte --plugin=prettier-plugin-tailwindcss --plugin=prettier-plugin-toml .",
    prefix: "Prettier",
    fixArgument: "--write",
    lintArgument: "--check",
  },
  {
    command: 'markdownlint "**/*.{md,mdx}" --ignore-path .gitignore',
    prefix: "MarkdownLint",
    fixArgument: "--fix",
    lintArgument: "",
  },
  {
    command: "cspell --quiet .",
    prefix: "CSpell",
    fixArgument: "",
    lintArgument: "",
  },
]);

function stylePrefixes(commands) {
  // ANSI color codes (excluding red and ANSI 256-colors)
  const colors = [
    "\x1b[32m", // Green
    "\x1b[34m", // Blue
    "\x1b[33m", // Yellow
    "\x1b[35m", // Magenta
    "\x1b[36m", // Cyan
    "\x1b[94m", // Bright Blue
    "\x1b[92m", // Bright Green
    "\x1b[93m", // Bright Yellow
    "\x1b[95m", // Bright Magenta
  ];
  const boldCode = "\x1b[1m";
  const resetCode = "\x1b[0m";

  // Find the length of the longest prefix
  const longestPrefixLength = commands.reduce(
    (max, cmd) => Math.max(max, cmd.prefix.length),
    0
  );

  // Pad each prefix with spaces to match the length of the longest prefix
  return commands.map((cmd, index) => {
    const colorCode = boldCode + colors[index % colors.length];
    const paddedLength = longestPrefixLength;
    const paddingLength = paddedLength - cmd.prefix.length;
    const paddedPrefix =
      colorCode +
      "[" +
      cmd.prefix +
      " ".repeat(paddingLength) +
      "]" +
      resetCode;
    return { ...cmd, prefix: paddedPrefix };
  });
}

async function runCommand(
  { command, prefix, fixArgument, lintArgument },
  fix = false
) {
  const fullCommand = `${command} ${fix ? fixArgument : lintArgument}`;
  console.log(`${prefix} Running command: ${fullCommand}`);

  const subprocess = spawn(fullCommand, {
    shell: true,
    env: { ...process.env, FORCE_COLOR: true },
  });

  subprocess.stdout.on("data", (data) => {
    const lines = data.toString().split(/\r?\n/);
    const prefixedLines = lines
      .filter((line) => line.trim() !== "") // Filter out empty lines
      .map((line) => `${prefix} ${line}`)
      .join("\n");
    if (prefixedLines) {
      process.stdout.write(prefixedLines + "\n"); // Add a newline at the end if there's output
    }
  });

  subprocess.stderr.on("data", (data) => {
    const lines = data.toString().split(/\r?\n/);
    const prefixedLines = lines
      .filter((line) => line.trim() !== "") // Filter out empty lines
      .map((line) => `${prefix} ${line}`)
      .join("\n");
    if (prefixedLines) {
      console.error(prefixedLines + "\n"); // Add a newline at the end if there's output
    }
  });

  // Wait for the 'close' event
  const [code] = await once(subprocess, "close");
  if (code !== 0) {
    throw new Error(`${prefix} Command failed with exit code ${code}`);
  }
}

export async function runAllCommands(fix = false) {
  let errors = [];
  for (const cmd of commands) {
    try {
      await runCommand(cmd, fix);
    } catch (error) {
      errors.push(error.message);
    }
  }

  if (errors.length > 0) {
    console.error(`${errors.length} task(s) failed:`);
    errors.forEach((err) => console.error(err));
    process.exit(1);
  } else {
    console.log("All tasks completed successfully.");
    process.exit(0);
  }
}
