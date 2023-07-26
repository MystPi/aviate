const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 60s linear infinite',
      },
      fontFamily: {
        sans: ['OutfitVariable', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains MonoVariable', ...defaultTheme.fontFamily.mono],
        display: ['LexendVariable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
