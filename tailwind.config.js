module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
  ],
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
