// eslint.config.mjs
// Flat ESLint config for Next 15 + React 19 + TypeScript.
// Prettier owns formatting; ESLint handles bugs/imports/hooks.

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';

export default [
  // Ignore generated & build outputs
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.vercel/**',
      '**/out/**',
    ],
  },

  // Config files run in Node; allow process, __dirname, etc.
  {
    files: [
      'eslint.config.mjs',
      'prettier.config.cjs',
      'postcss.config.mjs',
      'tailwind.config.{js,cjs,mjs}',
      'next.config.{js,cjs,mjs}',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },

  // Base JS recommendations (single object — do NOT spread)
  js.configs.recommended,

  // TypeScript recommended (array — safe to spread)
  ...tseslint.configs.recommended,

  // Project rules
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // Lightweight TS awareness without pinning a tsconfig path
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      '@next/next': nextPlugin,
      'import-x': importX,
    },
    settings: {
      // Treat "@/..." as internal imports for ordering
      'import-x/internal-regex': '^@/',
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // General safety
      'no-debugger': 'error',
      'no-console': 'warn',

      // React hooks correctness
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TS hygiene
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // Import ordering (with alias bucket)
      'import-x/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [{ pattern: '@/**', group: 'internal', position: 'before' }],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // Next: App Router-safe rule sample
      '@next/next/no-img-element': 'warn',
    },
  },
  // --- JS project files (use default parser; no TS parser here) ---
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      '@next/next': nextPlugin,
      'import-x': importX,
    },
    settings: {
      'import-x/internal-regex': '^@/',
    },
    rules: {
      'no-debugger': 'error',
      'no-console': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Use core rule for JS (TS rule is TS-only)
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'import-x/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          pathGroups: [{ pattern: '@/**', group: 'internal', position: 'before' }],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      '@next/next/no-img-element': 'warn',
    },
  },

  // Silence Next's generated triple-slash reference file
  {
    files: ['next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
];
