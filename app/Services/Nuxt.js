'use strict'

const Env = use('Env')
const Config = use('Config')
const { Nuxt, Builder } = require('nuxt')

class NuxtService {
  constructor () {
    this.nuxt = null
  }

  /**
   * Starts the build process
   *
   * @method boot
   *
   * @return {void}
   */
  build (dev = Env.get('NODE_ENV') === 'development') {
    const config = Config.merge('nuxt', { dev })
    this.nuxt = new Nuxt(config)
    if (dev || Env.get('IS_BUILD') === '1') {
      return new Builder(this.nuxt).build()
    }
  }

  /**
   * Handles the HTTP request by making the appropriate
   * response, based upon the URL.
   *
   * @method render
   *
   * @param  {Object} req
   * @param  {Object} res
   *
   * @return {Promise}
   */
  async render (req, res) {
    await this.nuxt.render(req, res)
  }
}

module.exports = new NuxtService()
