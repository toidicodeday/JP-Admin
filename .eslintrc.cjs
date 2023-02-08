module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: ["plugin:react-hooks/recommended", "react-app", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  root: true,
};
