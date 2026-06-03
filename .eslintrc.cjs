module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['mobile/**/*.{ts,tsx}'],
      extends: ['@react-native/eslint-config', 'prettier'],
      parser: '@typescript-eslint/parser',
    },
  ],
};

