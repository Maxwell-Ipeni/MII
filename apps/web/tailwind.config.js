const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: '#d2d2d7',
        input: '#d2d2d7',
        ring: '#0071E3',
        background: '#FFFFFF',
        foreground: '#1D1D1F',
        primary: {
          DEFAULT: '#0071E3',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F5F5F7',
          foreground: '#0066CC',
        },
        destructive: {
          DEFAULT: '#FF3B30',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#F5F5F7',
          foreground: '#86868b',
        },
        accent: {
          DEFAULT: '#0071E3',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1D1D1F',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1D1D1F',
        },
        link: '#0066CC',
      },
      borderRadius: {
        lg: '980px',
        md: '980px',
        sm: '980px',
        DEFAULT: '980px',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', 'Helvetica', 'Arial', ...fontFamily.sans],
        heading: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Helvetica Neue', 'Helvetica', 'Arial', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
