'use strict'

/*
|--------------------------------------------------------------------------
| Report Routes
|--------------------------------------------------------------------------
*/

const Route = use('Route')

Route.group(() => {

  Route.post('/', 'ReportController.store')

  Route.get('/', 'ReportController.index')

  Route.delete('/:id', 'ReportController.destroy')
})
  .prefix('/api/v1/registries')
  .middleware('auth')
