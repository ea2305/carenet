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
require('./registrie')
require('./family')


Route.any('*', 'NuxtController.render')
