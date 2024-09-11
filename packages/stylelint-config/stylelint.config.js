/* eslint-disable unicorn/no-null */
import { propertyGroups } from 'stylelint-config-clean-order';

const propertiesOrder = propertyGroups.map((properties) => ({
  emptyLineBefore: 'never', // Don't add empty lines between order groups.
  noEmptyLineBetween: true,
  properties,
}));

/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  ignoreFiles: ['./vendor/**/*'],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested', 'blockless-after-same-name-blockless'],
        ignoreAtRules: ['else', 'apply'],
      },
    ],
    'declaration-empty-line-before': 'never',
    'import-notation': 'string',
    'no-descending-specificity': [true, { ignore: ['selectors-within-list'] }],
    'no-invalid-position-at-import-rule': [true, { ignoreAtRules: ['tailwind'] }],
    'order/properties-order': [
      propertiesOrder,
      {
        severity: 'error',
        unspecified: 'bottomAlphabetical',
      },
    ],
    /** Selector class pattern must match [BEM CSS](https://en.bem.info/methodology/css) - [Regex](https://regexr.com/3apms) */
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
      {
        /** This option will resolve nested selectors with & interpolation. - https://stylelint.io/user-guide/rules/selector-class-pattern/#resolvenestedselectors-true--false-default-false */
        resolveNestedSelectors: true,
        /** Custom message */
        message: function expected(selectorValue) {
          return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`;
        },
      },
    ],
    'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],
  },
  'scss/at-rule-no-unknown': [
    true,
    {
      ignoreAtRules: [
        /* Tailwind */
        'tailwind',
        'apply',
        'layer',
        'config',
        'variants',
        'responsive',
        'screen',
      ],
    },
  ],
  'scss/load-partial-extension': 'never',
};
