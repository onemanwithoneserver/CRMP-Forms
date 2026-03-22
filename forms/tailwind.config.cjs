/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#fafafa',
          low: '#f5f5f5',
          container: '#eeeeee',
          lowest: '#ffffff',
        },
        border: {
          DEFAULT: '#e0e0e0',
          light: '#eeeeee',
          focus: '#424242',
        },
        text: {
          DEFAULT: '#212121',
          secondary: '#616161',
          tertiary: '#9e9e9e',
          inverse: '#ffffff',
        },
        accent: {
          DEFAULT: '#212121',
          hover: '#424242',
          subtle: '#f5f5f5',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.06)',
        'card': '0 2px 8px rgba(0,0,0,0.04)',
        'elevated': '0 4px 12px rgba(0,0,0,0.08)',
      },
      fontSize: {
        'display': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading': ['1.125rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-lg': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['0.8125rem', { lineHeight: '1.4', fontWeight: '500' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
