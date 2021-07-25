export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'treedeals-client',
    htmlAttrs: {
      lang: 'de',
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
    locale: process.env.LOCALE || 'de',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/app.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-copy-to-clipboard',
    '~/plugins/storyblok-rich-text-renderer.js',
    '~/plugins/content-loader.js',
    '~/plugins/vue-placeholders.js',
    '~/plugins/vue-masonry-wall.js',
    '~/plugins/vue-observe-visibility.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/composition-api/module',
  ],

  image: {
    // Options
    storyblok: {
      baseURL: 'https://img2.storyblok.com',
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n',
    'vue-social-sharing/nuxt',
    '@nuxtjs/auth-next',
    [
      'storyblok-nuxt',
      {
        accessToken: 'orL5ZAn9qQiNIFo5xlHXNwtt',
        cacheProvider: 'memory',
      },
    ],
  ],

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.BASE_URL,
      },
    },
  },

  i18n: {
    locales: [
      {
        code: 'de',
        iso: 'de-DE',
      },
      {
        code: 'ru',
        iso: 'ru-RU',
      },
    ],
    defaultLocale: process.env.LOCALE,
    detectBrowserLanguage: false,
    vueI18nLoader: true,
  },

  tailwindcss: {
    jit: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: process.env.BASE_URL,
    credentials: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
  },

  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
}
