import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const prettierConfig = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
};

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      ...js.configs.recommended.rules,
      'prettier/prettier': ['error', prettierConfig],
      'no-console': 'off',
      'no-underscore-dangle': 'off',
    },
  },
]);
