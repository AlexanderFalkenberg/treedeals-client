const { green } = require('tailwindcss/colors')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: true,
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['recoleta-semibold', 'system-ui', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      green: colors.emerald,
      red: colors.red,
    },
    extend: {
      minWidth: {
        button: '10rem',
      },
      height: {
        100: '30rem',
      },
      width: {
        100: '30rem',
        button: '10rem',
      },
      maxWidth: {
        auth: '25rem',
        xs: '12rem',
        sm: '18rem',
        xl: '40rem',
      },
      backgroundImage: (theme) => ({
        hero:
          "url('https://img2.storyblok.com/800x0/f/111247/1950x1300/70a5a1ca1b/photo-1516214104703-d870798883c5.jpeg')",
      }),
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.green.800'),
            },
            h2: {
              color: theme('colors.green.800'),
            },
            a: {
              color: theme('colors.green.500'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      ringColor: ['hover', 'active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
