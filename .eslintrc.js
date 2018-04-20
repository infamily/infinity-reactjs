export default {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        "singleQuote": true,
        "comma-dangle": "always",
        "arrow-parens": true,
        "tralingComma": "es5"
      }
    ],
    semi: [2, 'always'],
    semicolons: true,
    quotes: 'off',
    import: ['error', 'never', { packages: 'always' }]
  },
  plugins: ['prettier']
};
