/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#1a1a1a',
            a: {
              color: '#2563eb',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
            h1: {
              color: '#111827',
            },
            h2: {
              color: '#1f2937',
            },
            h3: {
              color: '#374151',
            },
            h4: {
              color: '#4b5563',
            },
            p: {
              color: '#1f2937',
            },
            strong: {
              color: '#111827',
            },
            code: {
              color: '#111827',
              backgroundColor: '#f3f4f6',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1f2937',
              code: {
                color: '#f3f4f6',
                backgroundColor: 'transparent',
              }
            },
            blockquote: {
              color: '#4b5563',
              borderLeftColor: '#2563eb',
            },
            ul: {
              color: '#1f2937',
            },
            ol: {
              color: '#1f2937',
            },
            li: {
              color: '#1f2937',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};