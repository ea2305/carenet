'use strict'

/*
|--------------------------------------------------------------------------
| Family Routes
|--------------------------------------------------------------------------
*/

const Route = use('Route')

Route.group(() => {

  Route.get('/:token', 'ReportController.family')  

})
  .prefix('/api/v1/families')
