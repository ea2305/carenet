'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()

      // User base information
      table.string('username', 254).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()

      // Adonis Persona req.
      table.string('rol').notNullable().defaultTo('nurse')

      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
