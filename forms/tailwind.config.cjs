/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1C2A44',
          dark: '#0F1B2E',
        },
        gold: {
          DEFAULT: '#C89B3C',
          light: '#E6C36A',
          subtle: 'rgba(200, 155, 60, 0.08)',
        },
        surface: {
          highest: '#FFFFFF',
          lowest: 'rgba(255, 255, 255, 0.85)',
          container: 'rgba(245, 247, 250, 0.5)',
        },
        border: {
          DEFAULT: '#E4E7EC',
          light: 'rgba(28, 42, 68, 0.05)',
          focus: '#C89B3C',
        },
        text: {
          DEFAULT: '#1C2A44',
          secondary: '#445069',
          tertiary: '#667085',
          inverse: '#FFFFFF',
        },
        shadow: {
          sm: '0 1px 2px rgba(15, 27, 46, 0.05)',
          md: '0 4px 12px rgba(15, 27, 46, 0.08), 0 2px 4px rgba(15, 27, 46, 0.04)',
          lg: '0 20px 48px rgba(15, 27, 46, 0.12), 0 8px 16px rgba(15, 27, 46, 0.08)',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15, 27, 46, 0.05)',
        md: '0 4px 12px rgba(15, 27, 46, 0.08), 0 2px 4px rgba(15, 27, 46, 0.04)',
        lg: '0 20px 48px rgba(15, 27, 46, 0.12), 0 8px 16px rgba(15, 27, 46, 0.08)',
        gold: '0 0 0 3px rgba(200, 155, 60, 0.1), 0 4px 12px rgba(15, 27, 46, 0.08), 0 2px 4px rgba(15, 27, 46, 0.04)',
      },
      fontSize: {
        display: ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],
        heading: ['1.125rem', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-lg': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        label: ['0.8125rem', { lineHeight: '1.4', fontWeight: '500' }],
        caption: ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)',
      },
      blur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
