'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportSchema extends Schema {
  up () {
    this.create('reports', (table) => {
      table.increments()
      table.integer('patient_id').unsigned().notNullable()
      table.foreign('patient_id').references('id').on('patients')
      table.integer('doctor_id').unsigned().notNullable()
      table.foreign('doctor_id').references('id').on('users')
      table.integer('nurse_id').unsigned().notNullable()
      table.foreign('nurse_id').references('id').on('users')
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('reports')
  }
}

module.exports = ReportSchema
