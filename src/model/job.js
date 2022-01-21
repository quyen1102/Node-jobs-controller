const mongoose = require('mongoose')


const JobSchema = new mongoose.Schema({
   company: {
      type: String,
      require: [true, 'Must provide company name'],
      maxLength: 50
   },
   position: {
      type: String,
      require: [true, 'Must provide company name'],
      maxLength: 100
   },
   status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],

   },
   createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: [true, 'Please provide user']

   }
}, {
   timestamps:true,
})

module.exports =  mongoose.model('Job', JobSchema)