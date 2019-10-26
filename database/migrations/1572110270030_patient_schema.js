'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PatientSchema extends Schema {
  up () {
    this.create('patients', (table) => {
      table.increments()
      table.string('name', 254).notNullable()
      table.integer('doctor_id').unsigned().notNullable()
      table.foreign('doctor_id').references('id').on('users')
      table.integer('guest_id').unsigned().notNullable()
      table.foreign('guest_id').references('id').on('guests')
      table.string('bed').notNullable()
      table.boolean('active').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('patients')
  }
}

module.exports = PatientSchema
