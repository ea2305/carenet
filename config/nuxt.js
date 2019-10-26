'use strict'

const resolve = require('path').resolve

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'CareNet',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Una aplicación web que busca mejorar la atención hospitalaria para el paciente. Por medio de: * Comunicación oportuna entre personal medico y familiares. *Creación de reportes para el personal médico.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    ]
  },
  modules: [
    '@nuxtjs/auth',
  ],
  plugins: [],
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
  css: ['~assets/css/main.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#744d82' },
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, '..', 'resources')
}
