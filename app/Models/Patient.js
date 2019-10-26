'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Patient extends Model {
    doctor(){
        return this.belongsTo('App/Model/User')
    }
}

module.exports = Patient
