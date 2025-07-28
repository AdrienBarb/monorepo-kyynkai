import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      fontFamily: {
        karla: ['Karla', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        primary: '#cecaff',
        'primary-light': '#d9d7f6',
        'primary-dark': '#B4ADFF',
        secondary: '#fff0eb',
        'secondary-dark': '#FFE8E0',
        'custom-black': '#1c131e',
        destructive: 'red',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
