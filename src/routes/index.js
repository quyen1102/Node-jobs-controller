const routeAuth = require('./auth')
const routeJobs = require('./jobs')

//middleware
const authenticationMiddleware = require('../middleware/authentication')

function route(app) {
   app.use('/api/v1/auth', routeAuth)
   app.use('/api/v1/jobs', authenticationMiddleware, routeJobs)
   
}

module.exports = route