'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Report extends Model {
    doctor(){
        return this.belongsTo('App/Models/User','doctor_id')
    }

    nurse(){
        return this.belongsTo('App/Models/User','nurse_id')
    }

}

module.exports = Report
