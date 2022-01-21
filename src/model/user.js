const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
   name: {
      type: String, 
      require: [true, 'Must provide name'],
      minLength: 3,
      maxLength: 20,
      unique: [true, 'This name already exists']
   },
   email: {
      type: String,
      require: [true, 'Must provide email'],
      minLength: 3,
      maxLength: 30,
      match: [
         /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
         'Please provide a valid email'
      ],
      unique: true
   },
   password: {
      type: String, 
      require: [true, 'Must provide name'],
      minLength: 6,
   },
})
UserSchema.pre('save', async function(){
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function() {
   return jwt.sign(
      {
         userID: this._id,
         name: this.name
      },
      process.env.JWT_TOKEN, 
      {
         expiresIn:process.env.JWT_LIFETIME
      })
}
UserSchema.methods.getName = function() {
   return this.name
}

module.exports = mongoose.model('User', UserSchema)