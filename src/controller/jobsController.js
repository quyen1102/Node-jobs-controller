const User = require('../model/user')
const Job = require('../model/job')
const { StatusCodes } = require('http-status-codes')
const user = require('../model/user')
const {
   BadRequestError,
   CustomAPIError,
   NotFoundError,
   UnAuthenticatedError
} = require('../errors')

// METHOD GET /jobs/
const getAllJobs = async (req, res, next) => {
   // console.log(req.user.userID);
   const jobs = await Job.find({createdBy: req.user.userID}).sort('createdAt')
   res.status(StatusCodes.OK).json({jobs: {jobs}, countJob: jobs.length})
}

// METHOD GET /jobs/:id
const getJob = async (req, res, next) => {
   const {
      user: { userID},
      params: { id: jobID}
   } = req
   //find job
   const job = await Job.findOne({
      _id: jobID , createdBy: userID
   })
   //check
   if(!job) {
      throw new NotFoundError(`No job with id ${jobID}`)
   }
   res.status(StatusCodes.OK).json({job})
}

//[POST] /jobs
const createJob = async (req, res, next) => {
   // console.log(req.user.userID);
   req.body.createdBy = req.user.userID
   
   const job = await Job.create(req.body)
   res.status(StatusCodes.CREATED).json({job})
}

//[DELETE] /jobs/:id
const deleteJob = async (req, res, next) => {
   const {
      user: { userID},
      params: { id: jobID}
   } = req
   const job = await Job.findOneAndDelete(
      {_id: jobID, creaetedBy: userID },
   )
   if(!job) {
      throw new NotFoundError(`Job: ${jobID} not found`)
   }
   res.status(StatusCodes.OK).send({msg: 'Job deleted successfully'})
}
// [PATCH] /jobs/:id
const updateJob = async (req, res, next) => {
   const {
      body: {company, position},
      user: { userID},
      params: { id: jobID}
   } = req

   if(company === '' || position === '') {
      throw new BadRequestError('Company and position must be provided!!!')
   }
   const job = await Job.findByIdAndUpdate(
      {_id: jobID, creaetedBy: userID },
      req.body,
      {new: true, runValidators: true},

   )
   //check
   if(!job) {
      throw new NotFoundError(`No job with id ${jobID}`)
   }
   res.status(StatusCodes.OK).json({job})
}

module.exports = {
   getAllJobs,
   getJob,
   createJob,
   deleteJob,
   updateJob
}