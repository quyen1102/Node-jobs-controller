
const asyncWrapper = require('../middleware/async')
const User = require('../model/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnAuthenticatedError } = require('../errors')



const resgister =  async (req, res, next) => {
   User.create({ ...req.body})
      .then((user) => {
         const token = user.createJWT()
         res
            .status(StatusCodes.CREATED)
            .json({user: {name: user.getName()},  token})
      }) 
      .catch(next)
}


const login =  async (req, res) => {
   const {email, password} = req.body
   const user = await User.findOne({email})

   if(!email || !password) {
      throw new BadRequestError('Must provide an email and password')
   }
   if(!user) {
      throw new UnAuthenticatedError('Invalid email credential')
   }
   //compare passwords
   const isPasswordCorrect = await user.comparePassword(password)
   if(!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid password credential')
   }
   const token = user.createJWT()
   res.status(StatusCodes.OK).json({user: {name: user.getName()}, token})

}


module.exports = {
   resgister,
   login
}