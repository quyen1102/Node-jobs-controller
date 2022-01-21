const routeAuth = require('./auth')
const routeJobs = require('./jobs')

function route(app) {
   app.use('/api/v1/auth', routeAuth)
   app.use('/api/v1/jobs', routeJobs)
   
}

module.exports = route