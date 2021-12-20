module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-no-bind': 'off',
    'no-alert': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'max-len': 'off',
    'no-self-assign': 'off',
    'no-param-reassign': ['error', { 'props': false }],
  },
};
