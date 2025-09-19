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
        background: '#000000',
        'background-light': '#292929',
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
