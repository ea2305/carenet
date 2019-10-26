'use strict'

/*
|--------------------------------------------------------------------------
| Patient Routes
|--------------------------------------------------------------------------
*/

const Route = use('Route')

Route.group(() => {

  Route.post('/', 'PatientController.store')

  Route.get('/', 'PatientController.index')

  Route.get('/:id', 'PatientController.show')
  
  Route.put('/:id', 'PatientController.update')

  Route.delete('/:id', 'PatientController.destroy')


})
  .prefix('/api/v1/patients')
  .middleware('auth_admin')
