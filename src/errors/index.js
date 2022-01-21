const BadRequestError = require('./bad-request')
const CustomAPIError = require('./custom-error')
const NotFoundError = require('./notfound')
const UnAuthenticatedError = require('./unauthenicate')

module.exports = {
   BadRequestError,
   CustomAPIError,
   NotFoundError,
   UnAuthenticatedError,
}