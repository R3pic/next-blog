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
            '--tw-prose-invert-headings': '#eee',
            '--tw-prose-body': theme('colors.light[foreground]'),
            '--tw-prose-invert-body': theme('colors.dark[foreground]'),
            '--tw-prose-invert-bold': '#eee',
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            code: {
              color: '#DD1144',
              backgroundColor: 'var(--tw-prose-hr)',
              borderRadius: theme('borderRadius.DEFAULT'),
              paddingLeft: theme('spacing[1.5]'),
              paddingRight: theme('spacing[1.5]'),
            },
            p: {
              'margin-top': '0rem',
            },
            h1: {
              'margin-top': '2rem',
              'margin-bottom': '1rem'
            },
            h2: {
              'margin-top': '0.875rem',
              'margin-bottom': '1rem'
            },
            ul: {
              'margin-top': '0',
            },
            ol: {
              'margin-top': '0',
            },
            a: {
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
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
        'reguler': ['krRg'],
      },
      screens: {
        'desktop': '1441px',
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