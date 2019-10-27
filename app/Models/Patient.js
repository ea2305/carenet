'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Patient extends Model {
    doctor(){
        return this.belongsTo('App/Models/User', 'id')
    }

    reports(){
        return this.hasMany('App/Models/Report')
    }
}

module.exports = Patient
