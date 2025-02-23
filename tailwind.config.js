/** @type {import('tailwindcss').Config} */

import { addDynamicIconSelectors } from '@iconify/tailwind';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'Menlo', 'Monaco'],
    },
    extend: {
      backgroundColor: {
        'sky-blue': '#D0DFE6',
      },
      width: {
        '50vw': '50vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '80vw': '80vw',
        '90vw': '90vw',
        '100vw': '100vw',
      },
      height: {
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '100vh': '100vh',
      },
      translate: {
        '1/2n': 'translate()',
      },
      flexGrow: {
        2: '2',
      },
      flex: {
        '1/2': '50%',
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
};
