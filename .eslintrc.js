module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: ["airbnb", "prettier"],
  rules: {
    "prettier/prettier": "error"
  },
  plugiens: ["prettier"]
}