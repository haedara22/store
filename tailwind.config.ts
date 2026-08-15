import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-cairo)',
          'Cairo',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      colors: {
        // Primary Orange - Brand Identity (Enhanced for Premium Look)
        orange: {
          50: '#fff8f1',
          100: '#ffedd5',
          200: '#fed8ab',
          300: '#fdc078',
          400: '#fb9c43',
          500: '#f97316', // Main Brand Color
          600: '#ea580c',
          700: '#c54309',
          800: '#9e350a',
          900: '#7c2d12',
          950: '#431407',
        },
        // Premium Glass Background Colors
        glass: {
          white: 'rgba(255, 255, 255, 0.85)',
          'white-light': 'rgba(255, 255, 255, 0.65)',
          'white-lighter': 'rgba(255, 255, 255, 0.45)',
          cream: 'rgba(254, 252, 249, 0.9)',
          'orange-light': 'rgba(255, 247, 237, 0.8)',
        },
        // Neutral Palette - Light Mode Optimized
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e8e8e8',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.01em', fontWeight: '400' }],
        'sm': ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0.005em', fontWeight: '400' }],
        'base': ['0.9375rem', { lineHeight: '1.5625rem', letterSpacing: '0', fontWeight: '400' }],
        'lg': ['1.0625rem', { lineHeight: '1.6875rem', letterSpacing: '-0.005em', fontWeight: '500' }],
        'xl': ['1.1875rem', { lineHeight: '1.8125rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.015em', fontWeight: '600' }],
        '3xl': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.02em', fontWeight: '700' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.025em', fontWeight: '700' }],
        '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.03em', fontWeight: '700' }],
        '6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.035em', fontWeight: '800' }],
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        'sm': '0.375rem',
        'DEFAULT': '0.5rem',
        'md': '0.625rem',
        'lg': '0.875rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        // Soft Shadows for Light Mode
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.07), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
        
        // Premium Glass Shadows
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.06)',
        'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.1)',
        
        // Brand Specific Glows & Soft Shadows
        'orange': '0 8px 24px -4px rgba(249, 115, 22, 0.2)',
        'orange-lg': '0 16px 40px -8px rgba(249, 115, 22, 0.25)',
        'orange-glow': '0 0 20px rgba(249, 115, 22, 0.25)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)',
        'inner-light': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;