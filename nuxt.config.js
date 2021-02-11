import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',

  head: {
    title: '東京の家賃相場',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  env: {
    GCP_KEY: process.env.GCP_KEY || undefined,
  },

  plugins: [{ src: '~/plugins/gmap.js' }],

  components: true,

  buildModules: ['@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios'],

  axios: {},

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {
    vendor: ['vue2-google-maps'],
    transpile: [/^vue2-google-maps($|\/)/],
  },
}
