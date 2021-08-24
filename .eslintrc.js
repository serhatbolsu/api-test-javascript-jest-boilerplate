module.exports = {
  'env': {
    'es6': true,
    'browser': true,
    "jest/globals": true
  },
  'extends': [
    'google',
    "plugin:jest/recommended",
    "plugin:jest/style"
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
   'parser': "@babel/eslint-parser",
   'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 2018,
  },
  'rules': {
    "arrow-parents": [0, "as-needed"],
    'quotes': [0, "double"],
    "no-unused-vars": "off",
    "new-cap": "off",
    "require-jsdoc": "off",
    "brace-style": [0, "allman", { "allowSingleLine": true }],
    "max-len": ["error", { "code": 120 }],
    "object-curly-spacing": ["error", "always"],
    "linebreak-style": ["error", "unix"]
  },
  'plugins': [
      "jest"
  ],
};
