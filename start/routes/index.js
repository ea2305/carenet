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
require('./patient')


Route.any('*', 'NuxtController.render')
