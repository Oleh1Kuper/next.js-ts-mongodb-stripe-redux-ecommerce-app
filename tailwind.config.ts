import type { Config } from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
        montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
      },
      backgroundImage: {
        'primary-gradiant': 'linear-gradient(180.96deg, #000 0.82%, #4a2800 129.1%)',
      },
      colors: {
        primary: {
          light: '#fcc182',
          DEFAULT: '#fa9021',
          dark: '#af5b04',
        },
      },
    },
  },
  plugins: [],
};
export default config;
