import configEnvsa from '@envsa/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...configEnvsa,
  {
    ignores: ['**/bin/cli.js'],
  },
  {
    settings: {
      'import/resolver': {
        alias: {
          map: [['$root', './']],
        },
      },
    },
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
];
