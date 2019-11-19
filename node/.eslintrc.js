// eslint-disable-next-line no-undef
const baseRules = require("eslint-config-lydell");

// eslint-disable-next-line no-undef
module.exports = {
  extends: ["react-app", "plugin:prettier/recommended"],
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["import", "prettier", "react", "react-hooks", "simple-import-sort"],
  rules: Object.assign({}, baseRules(), {
    "no-invalid-this": "error",
    "prettier/prettier": "error",
    "simple-import-sort/sort": "error",
    indent: ["error", 2],
  }),
  globals: Object.assign({}, baseRules.browserEnv(), {}),
  settings: {
    react: {
      version: "detect",
    },
  },
};
