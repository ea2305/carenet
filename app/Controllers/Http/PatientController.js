'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Hash = use('Hash')
const Patient= use('App/Models/Patient')
const Guest= use('App/Models/Guest')
const User= use('App/Models/User')
const Report= use('App/Models/Report')
/**
 * Resourceful controller for interacting with patients
 */
class PatientController {
      /**
   * setup
   */
  constructor () {
    this.page = 1
    this.perPage = 10
  }
  /**
   * Show a list of all patients.
   * GET patients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    let { page, search, perPage } = request.all()
    page = page || this.page
    perPage = perPage || this.perPage

    // prepare statement
    let query = Patient.query()

    query.with('doctor')

    if (search) {
      query.where('name', 'LIKE', `%${search}%`)
    }
    query.orderBy('id', 'desc')

    let patients = await query.paginate(page, perPage)
    return response.ok({patients})


  }


  /**
   * Create/save a new patient.
   * POST patients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let { name, bed , doctor_id }=request.only(['name','bed','doctor_id'])
    await User.findOrFail(doctor_id)
    let token = await Hash.make(Date.now().toString())
    token = token.substring(7,12)
    let guest =await Guest.create({
      token
    })
    let patient = await Patient.create({
      name,
      bed ,
      doctor_id,
      guest_id:guest.id
    })
    return response.ok(patient)
  }

  /**
   * Display a single patient.
   * GET patients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    let {id } = params
    let query = Patient.query()

    query.with('guest')
    query.where('id', id)

    let patient = await query.first()

    return response.ok({ patient })
  }



  /**
   * Update patient details.
   * PUT or PATCH patients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
     // find patient
     let {id } = params
     let patient = await Patient.findOrFail(id)
     let { name, bed , doctor_id , active}=request.only(['name','bed','doctor_id','active'])
     const data = {
         name,
         bed,
         doctor_id,
         active
     }
     patient.merge(data)
     await patient.save()

     return response.ok({patient})
  }

  /**
   * Delete a patient with id.
   * DELETE patients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    let {id} = params
    let patient = await Patient.findOrFail(id)

    patient.active=false
    await patient.save()
    return response.status(200).json(patient)
  }

    /**
   * Retrieve reports from a patient with id.
   * GET patients/:id/registres
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async reports({params}){
    let {id} = params
    const patient =await Patient.findOrFail(id)
    let query = Report.query()
    query.with('doctor')
    query.with('nurse')
    query.where('patient_id',id)

    return  await query.fetch()
  }
}

module.exports = PatientController
