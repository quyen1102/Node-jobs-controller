const CustomAPIError = require('./custom-error')
const { StatusCodes } = require('http-status-codes')

class UnAuthenticatedError extends CustomAPIError {
   constructor(message, statusCode){
      super(message)
      this.statusCode = StatusCodes.UNAUTHORIZED
   }
}

module.exports = UnAuthenticatedError