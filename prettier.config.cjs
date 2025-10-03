// prettier.config.cjs
/** @type {import("prettier").Config} */
module.exports = {
  // === General style, tuned for TS/React/Next ===
  printWidth: 100, // balanced diffs + readability in TS/JS
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true, // JS/TS with single quotes
  jsxSingleQuote: false, // JSX double quotes (ecosystem default)
  trailingComma: 'all', // better diffs; JSON override disables it
  bracketSpacing: true,
  bracketSameLine: false, // put `>` on its own line in JSX
  arrowParens: 'always',
  quoteProps: 'as-needed',
  endOfLine: 'lf', // avoid cross-OS EOL churn
  embeddedLanguageFormatting: 'auto',

  // === Next/Tailwind specifics ===
  // Sort Tailwind classnames; also keeps package.json sorted & stable.
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-packagejson'],
  // Ensure Tailwind classes sort inside common helpers we use.
  tailwindFunctions: ['clsx', 'cn', 'cva'],

  // === Per-file overrides (stability & readability) ===
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 80, // prose reads better narrower
        proseWrap: 'preserve',
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: { printWidth: 80 },
    },
    {
      files: ['*.json', '*.jsonc'],
      options: {
        trailingComma: 'none', // JSON spec
      },
    },
    // Keep package.json stringified consistently; plugin will sort keys.
    {
      files: ['package.json'],
      options: {
        parser: 'json-stringify',
      },
    },
  ],
};
