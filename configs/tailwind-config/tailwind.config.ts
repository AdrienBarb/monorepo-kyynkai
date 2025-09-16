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
        primary: '#fff0eb',
        secondary: '#cecaff',
        thirdary: '#565a66',
        background: '#1c131e',
        'background-light': '#3A283E',
        destructive: 'red',
      },
      screens: {
        sm: '600px',
        md: '1024px',
        xl: '1280px',
      },
      maxWidth: {
        container: '940px',
        'secondary-container': '1360px',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
