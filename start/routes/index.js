'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

const Route = use('Route')

// Router split files
require('./auth')
require('./user')


Route.any('*', 'NuxtController.render')
