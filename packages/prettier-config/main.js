import { homedir } from "os";

/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  useTabs: true,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 120,
  overrides: [
    {
      files: "*.astro",
      options: {
        plugins: ["prettier-plugin-astro"],
        parser: "astro",
      },
    },
    {
      files: "*.svelte",
      options: {
        plugins: ["prettier-plugin-svelte"],
        parser: "svelte",
      },
    },
    {
      files: "*.rb",
      options: {
        rubyExecutablePath: `${homedir}/.rbenv/shims/ruby`,
      },
    },
    {
      files: ["*rc", "*ignore"],
      options: {
        plugins: ["prettier-plugin-sh"],
        parser: "sh",
      },
    },
  ],
  plugins: [
    "@prettier/plugin-php",
    "@prettier/plugin-ruby",
    "@prettier/plugin-xml",
    "prettier-plugin-pkg",
    "prettier-plugin-sh",
    "prettier-plugin-sql",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-toml",
  ],
};

export default config;
