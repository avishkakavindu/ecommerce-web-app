// tailwind.config.js

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#001EB9',
        secondary: '#969191',
        dark: '#162427',
        shadow: '#F7F7F7',
        light: '#ffffff',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};
