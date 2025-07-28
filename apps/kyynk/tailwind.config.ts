import type { Config } from 'tailwindcss';
import sharedConfig from '@kyynk/tailwind-config';

const config: Pick<Config, 'content' | 'presets'> = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [sharedConfig],
};

export default config;
