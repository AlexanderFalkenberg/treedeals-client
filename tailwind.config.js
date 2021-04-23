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
    extend: {},
  },
  theme: {
    extend: {
      maxWidth: {
        truncate: '28rem',
        auth: '25rem',
        sm: '18rem',
        xs: '15rem',
        xl: '40rem',
      },
    },
  },
  variants: {
    extend: {
      ringColor: ['hover', 'active'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
}
