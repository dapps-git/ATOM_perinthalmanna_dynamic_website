/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        atom: {
          red: '#DC2626', // primary brand red
          redDark: '#B91C1C',
          redLight: '#FEE2E2',
          redBorder: '#FCA5A5',
          black: '#111827',
          gray: '#4B5563',
          lightBg: '#F9FAFB',
          card: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
};

