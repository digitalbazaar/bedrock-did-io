module.exports = {
  root: true,
  parserOptions: {
    // this is required for dynamic import() and
    // top-level await
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  env: {
    node: true
  },
  extends: [
    'digitalbazaar',
    'digitalbazaar/jsdoc',
    'digitalbazaar/module'
  ],
  ignorePatterns: ['node_modules/'],
  rules: {
    'unicorn/prefer-node-protocol': 'error'
  }
};
