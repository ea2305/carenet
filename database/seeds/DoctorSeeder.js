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

class DoctorSeeder {
  async run () {
    for(let i=0;i<24;i++){
      await Factory
      .model('App/Models/User')
      .create({ rol: 'doctor' })
    } 
  }
}

module.exports = DoctorSeeder
