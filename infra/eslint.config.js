const js = require('@eslint/js');
const babelParser = require('@babel/eslint-parser');
const globals = require('globals');
const prettier = require('eslint-plugin-prettier/recommended');

module.exports = [
  {
    ignores: ['node_modules/**', 'cdk.out/**', '**/*.js', '**/*.d.ts'],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          parserOpts: {
            plugins: ['typescript'],
          },
        },
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // Type checking is handled by `tsc`; these core rules are type-unaware and
      // fire false positives on type-only references under @babel/eslint-parser.
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
  prettier,
];
