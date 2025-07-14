module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['expo', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['node_modules/', 'dist/'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // Optional custom rules
  },
};
