/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        atom: {
          red: '#DC2626',
          redDark: '#B91C1C',
          redDeep: '#991B1B',
          redLight: '#FEE2E2',
          black: '#111827',
          charcoal: '#1E293B',
          gray: '#4B5563',
          lightGray: '#F8FAFC',
        },
      },
    },
  },
  plugins: [],
};
