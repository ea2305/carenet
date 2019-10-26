'use strict'

/*
|--------------------------------------------------------------------------
| DoctorSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')
const Guest= use('App/Models/Guest')
class DoctorSeeder {
  async run () {
    for(let i=0;i<24;i++){
      let doctor = await Factory
      .model('App/Models/User')
      .create({ rol: 'doctor' })

      let token = await Hash.make(Date.now().toString())
      token = token.substring(7,12)
      let guest =await Guest.create({
        token
      })

      await Factory
      .model('App/Models/Patient')
      .create({ doctor_id: doctor.id,guest_id:guest.id })

    } 
  }
}

module.exports = DoctorSeeder
