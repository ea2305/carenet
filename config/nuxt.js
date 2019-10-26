'use strict'

const resolve = require('path').resolve

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Carenet',
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
        content: 'Adonuxt project'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css', integrity: 'sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ', crossorigin: 'anonymous'}
    ]
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
