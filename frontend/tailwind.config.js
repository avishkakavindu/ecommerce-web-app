/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      xss: '0.6rem',
    },
    fontFamily: {
      satoshi: 'satoshi',
    },
    extend: {
      colors: {
        primary: '#001EB9',
        secondary: '#969191',
        dark: '#162427',
        shadow: '#F7F7F7',
      },
    },
    screens: {
      xxs: '320px',
      xs: '375px',
      sm: '425px',
      srg: '640px',
      rg: '768px',
      xrg: '864px',
      md: '1024px',
      lg: '1366px',
      xl: '1536px',
      twoXl: '1920px',
      threeXl: '2560px',
    },
  },
  daisyui: {
    themes: ['light'],
  },
  plugins: [require('daisyui')],
};
