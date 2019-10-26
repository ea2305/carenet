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
require('./report')


Route.any('*', 'NuxtController.render')
