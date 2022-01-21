const jwt = require('jsonwebtoken')
const User = require('../model/user')

const { UnAuthenticatedError } = require('../errors')

const auth = async (req, res, next) =>{
   // get token in client 
   const authHeader = req.headers.authorization
   if(!authHeader || !authHeader.startsWith('Bearer')){
      throw new UnAuthenticatedError('Invalid Authetication 1')
   }
   const token = authHeader.split(' ')[1]
   try {
      const payload = jwt.verify(token, process.env.JWT_TOKEN)
      const { userID, name } = payload
      req.user = {userID,  name}
      next()
   } catch (error) {
      throw new UnAuthenticatedError('Invalid Authetication 2')
   }
}


module.exports = auth