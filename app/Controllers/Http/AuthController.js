'use strict'

class AuthController {
    
    /**
   * Login user.
   * POST users
   */
  async login ({  auth,request}) {
    return await auth.attempt(request.input('email'), request.input('password'))
  }

   /**
   * Register new user
   */
  /**
   * Close session
   * @param {Object} ctx.response : HTTP Response
   */
  async logout ({ response }) {
    return response.ok({ message: 'Session was closed.' })
  }

  /**
   * Show user with auth.
   * GET user
   */
  async identity({auth,response}){
    try {
      let user = await auth.getUser()
      return response.ok({user})
    } catch (error) {
      response.send('Credentials missing')
    }
  }
}

module.exports = AuthController
