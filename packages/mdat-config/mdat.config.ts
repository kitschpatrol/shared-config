import { type Config } from 'mdat';

export default {
  rules: {
    'shared-config':
      '## Project configuration\n\nThis project uses [@envsa/shared-config](https://github.com/envsa/shared-config) to consolidate various linting and formatting tool configurations under a single dependency and command. (ESLint, Prettier, CSpell, etc.)',
  },
} satisfies Config;
