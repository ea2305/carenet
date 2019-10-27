'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Patient= use('App/Models/Patient')
const User= use('App/Models/User')
const Report= use('App/Models/Report')
const Guest= use('App/Models/Guest')
/**
 * Resourceful controller for interacting with reports
 */
class ReportController {
  /**
   * setup
   */
  constructor () {
    this.page = 1
    this.perPage = 10
    this.pageF = 1
    this.perPageF = 10
  }
  /**
   * Show a list of all reports.
   * GET reports
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    let { page, type, perPage } = request.all()
    page = page || this.page
    perPage = perPage || this.perPage

    // prepare statement
    let query = Report.query()
    .orderBy('id', 'desc') 

    query.with('doctor')
    query.with('nurse')
    if (type) {
      query.where('type', 'LIKE', `%${type}%`)
    }

    let reports = await query.paginate(page, perPage)
    return response.ok({reports})
  }



  /**
   * Create/save a new report.
   * POST reports
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    let { patient_id , doctor_id , nurse_id , type , description }=request.only(['patient_id','doctor_id','nurse_id','type','description'])
    await Patient.findOrFail(patient_id)
    await User.findOrFail(doctor_id)
    await User.findOrFail(nurse_id)

    let report = await Report.create({
      patient_id , 
      doctor_id , 
      nurse_id , 
      description,
      type
    })

    return response.ok({report})
  }

 




  /**
   * Delete a report with id.
   * DELETE reports/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params,  response }) {
    let {id } = params
    const report = await Report.findOrFail(id)

    await report.delete()

    return response.status(200).json(report)
  }


  async family({ params}){
    let {token} = params
    let guest = await Guest.findByOrFail('token',token)
    let patient = await Patient.findByOrFail('guest_id',guest.id)
    let query = Report.query()
    let { page,  perPage } = request.all()
    page = page || this.pageF
    perPage = perPage || this.perPageF
    .orderBy('id', 'desc') 
    query.with('doctor')
    query.with('nurse')
    query.where('patient_id',patient.id)

    let reports = await query.paginate(page, perPage)
    return response.ok({reports})
  }
}

module.exports = ReportController
