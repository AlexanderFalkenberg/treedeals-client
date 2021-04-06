export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'treedeals-client',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-copy-to-clipboard'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'http://localhost:3000',
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'http://localhost:3000',
    credentials: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: 8000, // default: 3000
  },
}
