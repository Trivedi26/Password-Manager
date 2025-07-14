// eslint.config.js
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import eslintConfigExpo from 'eslint-config-expo';
import tseslint from 'typescript-eslint';

export default [
  eslintConfigExpo,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: eslintPluginReact,
      'react-native': eslintPluginReactNative,
    },
    rules: {
      // your custom rules here (optional)
    },
  },
];
