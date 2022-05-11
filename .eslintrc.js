module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-shadow': 'off',
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
