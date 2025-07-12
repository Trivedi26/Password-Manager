import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactNative from 'eslint-plugin-react-native';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginExpo from 'eslint-plugin-expo';

export default [
  {
    ignores: ['node_modules'], // Ignore files or folders
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      sourceType: 'module',
      globals: {
        console: true,
        document: true,
        window: true,
      },
    },
    plugins: {
      react: eslintPluginReact,
      'react-native': eslintPluginReactNative,
      'react-hooks': eslintPluginReactHooks,
      expo: eslintPluginExpo,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
