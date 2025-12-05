/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FFEB3B',
          600: '#FDD835',
          700: '#FBC02D',
          800: '#F9A825',
          900: '#F57F17',
        },
        flame: {
          inner: '#FFF',
          middle: '#FFD700',
          outer: '#FF4500',
        }
      },
      animation: {
        'flicker': 'flicker 3s infinite alternate',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1) skewX(0deg)', opacity: 1 },
          '25%': { transform: 'scale(1.05) skewX(1deg)', opacity: 0.9 },
          '50%': { transform: 'scale(0.95) skewX(-1deg)', opacity: 0.8 },
          '75%': { transform: 'scale(1.02) skewX(2deg)', opacity: 0.95 },
        }
      }
    },
  },
  plugins: [],
}
