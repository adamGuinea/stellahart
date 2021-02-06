module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: false,
      },
    ],
  },
};
