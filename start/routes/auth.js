'use strict'

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

const Route = use('Route')

Route.group(() => {

  // Login user
  Route.post('/login', 'AuthController.login')
    
  
  // Logout
  Route.post('/logout', 'AuthController.logout')
    .middleware('auth')

  // Personal info
  Route.get('/identity', 'AuthController.identity')
    .middleware('auth')
})
  .prefix('/api/v1/auth')
