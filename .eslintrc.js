module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-native",
    "import",
    "react-hooks",
  ],
  extends: [
    "expo",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-require-imports": "error",
    "import/no-unresolved": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off", // not needed in React 17+
    "react-native/no-inline-styles": "off", // allow inline styles if needed
    "react-native/no-color-literals": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
