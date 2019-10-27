'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Patient extends Model {
    doctor(){
        return this.belongsTo('App/Models/User', 'doctor_id')
    }

    reports() {
        return this.hasMany('App/Models/Report')
    }

    guest () {
        return this.belongsTo('App/Models/Guest', 'guest_id')
    }
}

module.exports = Patient
