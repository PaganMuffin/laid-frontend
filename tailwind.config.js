const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      indigo: colors.indigo,
      purple: colors.purple,
      yellow: colors.yellow,
      orange: colors.orange,
      cyan: colors.cyan,
      fuchsia: colors.fuchsia,
      rose: colors.rose,
      blue: colors.blue,
      green: colors.green
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
  
      'md': '768px',
      // => @media (min-width: 768px) { ... }
  
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
  
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
  
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
          bg_dark:'#121212',
          primary: '#352464'
      },
      backgroundOpacity: {
          '8':'0.08'
      },
      invert: {
          70: '.70'
      },
      maxHeight: {
        100: '25rem',
        104: '26rem',
        108: '27rem',
        116: '29rem',
        120: '30rem',
        124: '31rem',
    },
    },
  },
  variants: {
    extend: {
        fontSize: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
