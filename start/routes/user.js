'use strict'

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

const Route = use('Route')

Route.group(() => {
  Route.post('/', 'UserController.store')

  Route.get('/', 'UserController.index')

  Route.get('/:id', 'UserController.show')

  Route.put('/:id', 'UserController.update')

  Route.delete('/:id', 'UserController.destroy')

  Route.post('/:id/password', 'UserController.changePassword')
})
  .prefix('/api/v1/users')
  .middleware('auth_admin')
