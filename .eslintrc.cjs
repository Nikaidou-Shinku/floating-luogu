/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:solid/typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "solid",
    "@typescript-eslint",
  ],
  rules: {
    "indent": [
      "error",
      2,
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    "quotes": [
      "error",
      "double",
    ],
    "semi": [
      "error",
      "always",
    ],
    "no-duplicate-imports": "error",
    "arrow-body-style": [
      "warn",
      "as-needed",
    ],
    "camelcase": "warn",
    "curly": "error",
    "eqeqeq": "error",
    "func-style": "warn",
    "no-else-return": "warn",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-lonely-if": "warn",
    "no-mixed-operators": "warn",
    "no-multi-assign": "warn",
    "no-return-assign": "warn",
    "no-return-await": "warn",
    "no-sequences": "warn",

    "eol-last": "error",
    "comma-dangle": [
      "error",
      "always-multiline",
    ],
  },
};
