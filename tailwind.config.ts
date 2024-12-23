import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      typography: ({ theme }: { theme: (s: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-links': theme('colors.blue[400]'),
            '--tw-prose-headings': theme('colors.light[foreground]'),
            '--tw-prose-invert-links': theme('colors.yellow[500]'),
            '--tw-prose-invert-headings': theme('colors.dark[foreground]'),
            color: 'inherit',
            p: {
              'margin-top': '0rem',
              'margin-bottom': '0rem'
            },
            h1: {
              'margin-top': '2rem',
              'margin-bottom': '1rem'
            },
            a: {
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
              },
            },
          }
        },
      }),
      colors: {
        'dark': {
          'background': '#1E1E1F',
          'foreground': '#aaa',
        },
        'light': {
          'background': '#fff',
          'foreground': '#3A241A',
        },
      },
      margin: {
        'right-sidebar': 'var(--sidebar-margin)',
      },
      spacing: {
        'sidebar-size': 'var(--sidebar-size)',
        'sidebar-min': '18rem',
        'pagewidth': 'var(--pagewidth-desktop)'
      },
      fontFamily: {
        'reguler': ['jpRg', 'krRg'],
        'bold': ['jpBd', 'krBd'],
      },
      screens: {
        'desktop': '1441px',
        'desktop-small': '768px',
      },
      aspectRatio: {
        'thumbnail': '2'
      },
      animation: {
        'pulse-scale': 'pulse-scale 2s infinite ease-in-out',
      },
      keyframes: {
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
        },
      }
    },
  },
  plugins: [
    typography,
  ],
} satisfies Config;