'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User= use('App/Models/User')
/**
 * Resourceful controller for interacting with users
 */
class UserController {

    /**
   * setup
   */
  constructor () {
    this.page = 1
    this.perPage = 10
  }

  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response}) {
    let { page, search,perPage } = request.all()
    page = page || this.page
    perPage = perPage || this.perPage

    // prepare statement
    let query = User.query()
    .orderBy('id', 'asc') 

    if (search) {
      query.where('email', 'LIKE', `%${search}%`)
    }
    let users = await query.paginate(page, perPage)
    return response.ok({users})
  }



  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let {username,email,password}=request.only(['username','email','password','rol'])
    let user=await User.create({
        username,
        email,
        password,
        rol
    })
    
    return response.ok({user})
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

  }



  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    // find user
    let {id } = params
    let user = await User.findOrFail(id)
    let {username,email,rol}=request.only(['username','email','rol'])
    const data = {
        username,
        email,
        rol
    }
    user.merge(data)
    await user.save()

    return response.ok({user})
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    let {id} = params
    let user = await User.findOrFail(id)

    await user.delete()

    return response.status(200).json({user})
  }

    /**
   * Change UserPassword
   * PUT users/changePassword
   * @param {Object} ctx.auth HTTP user request body
   * @param {Object} ctx.request HTTP user request body
   * @param {Object} ctx.response HTTP server response
   * @return {Object} JSON package response
   */
  async changePassword ({ params, request, response }) {
    // find user
    let {id } = params
    let user = await User.findOrFail(id)
    let { password } = request.only(['password'])

    const data = {
      password
    }
    user.merge(data)
    await user.save()

    return response.ok({user})
  }
}

module.exports = UserController
