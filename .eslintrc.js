module.exports = {
  'env': {
    'es6': true,
    'browser': true,
    'mocha': true,
  },
  'extends': [
    'google',
    "plugin:mocha/recommended"
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'rules': {
    "arrow-parents": [0, "as-needed"],
    'quotes': [0, "double"],
    "no-unused-vars": "off",
    "new-cap": "off",
    "require-jsdoc": "off",
    "brace-style": [0, "allman", { "allowSingleLine": true }],
    "max-len": ["error", { "code": 100 }],
    "object-curly-spacing": ["error", "always"],
  },
  'plugins': [
    "mocha",
  ],
};
