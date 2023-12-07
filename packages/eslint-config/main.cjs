module.exports = {
  // env: {
  // 	browser: true,
  // 	es2017: true,
  // 	node: true,
  // },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-recommended",
    "plugin:svelte/recommended",
    "plugin:unicorn/recommended",
    "prettier",
    "plugin:perfectionist/recommended-natural",
  ],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        extraFileExtensions: [".astro"],
        parser: "@typescript-eslint/parser",
      },
      rules: {
        "no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
          },
        ],
        "unicorn/filename-case": "off",
      },
    },
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      rules: {
        // https://github.com/nuxt/eslint-config/issues/140
        "@typescript-eslint/ban-types": "off",
        // https://github.com/typescript-eslint/typescript-eslint/blob/1cf9243/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
        "no-undef": "off",
      },
    },
  ],
  rules: {
    // possible perfectionist conflicts
    "@typescript-eslint/adjacent-overload-signatures": "off",
    "@typescript-eslint/sort-type-constituents": "off",
    "import/order": "off",
    "perfectionist/sort-imports": [
      "error",
      {
        "newlines-between": "never",
      },
    ],
    "react/jsx-sort-props": "off",
    "sort-imports": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          Props: true,
        },
      },
    ],
  },
};
