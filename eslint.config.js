import eslint from '@eslint/js';
import expolint from 'eslint-config-expo/flat.js';
import prettier from 'eslint-plugin-prettier';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import { configs as tseslint } from 'typescript-eslint';

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.recommended,
  // The Expo lint config defines both plugins:
  // 'react/' ('eslint-plugin-react') AND
  // 'react-hooks/' ('eslint-plugin-react-hooks')
  ...expolint,
  { ignores: ['dist', '**/dist/**'] },
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-refresh': reactRefreshPlugin,
      prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: [
            './tsconfig.json',
            './apps/*/tsconfig.json',
            './apps/*/tsconfig.*.json',
            './shared/tsconfig.json',
          ],
        },
      },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': ['off'],
      //
      // TODO_NEXT start adding rules and fix the issues
      // https://albertobasalo.medium.com/fine-tune-eslint-rules-to-code-better-typescript-e4cabbbe2fa1
      '@/no-nested-ternary': 'error',
      //
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'prettier/prettier': [
        'error',
        {
          tabWidth: 2,
          singleQuote: true,
          jsxSingleQuote: true,
          semi: true,
          printWidth: 110,
          arrowParens: 'always',
          trailingComma: 'all',
          endOfLine: 'auto',
          importOrder: [
            '^react(.*)$',
            '<THIRD_PARTY_MODULES>',
            '^@ocome/shared(.*)$',
            '^redux(.*)$',
            '^react-redux(.*)$',
            '^react-router-dom(.*)$',
            '^@mui/material/(.*)$ | ^@mui/material(.*)$',
            '^@mui/icons-material/(.*)$ | @mui/icons-material(.*)$',
            '^pages/(.*)$',
            '^components/(.*)$',
            '^assets/(.*)$',
            '^types',
            '^[./]',
          ],
          importOrderSeparation: true,
          importOrderSortSpecifiers: true,
          plugins: ['@trivago/prettier-plugin-sort-imports'],
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    },
  },
  // Prevent web app from importing mobile-specific code to maintain platform separation
  {
    files: ['apps/web/**/*.{js,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@ocome/mobile/*', 'apps/mobile/*'],
              message: 'Web app must not import from mobile app.',
            },
          ],
        },
      ],
    },
  },
  // Prevent mobile app from importing web-specific code to maintain platform separation
  {
    files: ['apps/mobile/**/*.{js,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@ocome/web/*', 'apps/web/*'],
              message: 'Mobile app must not import from web app.',
            },
          ],
        },
      ],
    },
  },
  // Ensure shared package remains app-agnostic and doesn't depend on platform-specific code
  {
    files: ['shared/**/*.{js,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['apps/*', '@ocome/mobile*', '@ocome/web*'],
              message: 'Shared package must remain app-agnostic.',
            },
          ],
        },
      ],
    },
  },
]);
