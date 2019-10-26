'use strict'
require('dotenv').config()

const resolve = require('path').resolve

module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
 env: {
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
    API_URL: process.env.API_URL || 'http://localhost:3000/api/v1',
    API_URL_BROWSER: process.env.API_URL || 'http://localhost:3000/api/v1'
  },
  head: {
    title: 'Carenet',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
      { 'http-equiv': 'ScreenOrientation', content: 'autoRotate:disabled' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
      {
        hid: 'description',
        name: 'description',
        content: 'Una aplicación web que busca mejorar la atención hospitalaria para el paciente. Por medio de: * Comunicación oportuna entre personal medico y familiares. *Creación de reportes para el personal médico.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: 'favicon.png' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css', integrity: 'sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ', crossorigin: 'anonymous'}
    ]
  },
     /**
   * Project modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    ['@nuxtjs/moment', ['es']],
    'nuxt-buefy'
  ],
  plugins: [],
  axios: {
    https: true
  },
  dotenv: {
    path: `${__dirname}/..`,
    only: [
      'APP_URL',
      'API_URL',
      'API_URL_BROWSER'
    ]
  },
  auth: {
    token: { prefix: 'token' },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'post' },
          reset: { url: '/auth/identity', method: "get" },
          user: { url: '/auth/identity', method: 'get', propertyName: 'user' }
        }
      },
      tokenType: 'bearer'
    },
    cookie: {
      name: 'token',
      options: { expires: 30, secure: true }
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      callback: '/auth/login',
      home: '/panel'
    },
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/styles/_animation.sass', lang: 'sass' },
    { src: '~assets/styles/_margin.sass', lang: 'sass' },
    { src: '~assets/styles/_position.sass', lang: 'sass' },
    { src: '~assets/styles/_viewport_size.sass', lang: 'sass' },
    { src: '~assets/styles/_align_rules.sass', lang: 'sass' },
    { src: '~assets/styles/_fonts.sass', lang: 'sass' },
    { src: '~assets/styles/base_bulma.scss', lang: 'scss' }, // Bluma MOD
    { src: 'swiper/dist/css/swiper.css', lang: 'css'},
    '~assets/css/main.css'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#744d82' },
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, '..', 'resources')
}
