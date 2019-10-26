'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ScopeNurse {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth,response }, next) {
    const user = auth.user
    if(user.rol=='nurse'){
      await next()
    }else{
      return response
      .status(401).json()
    }
  }
}

module.exports = ScopeNurse
