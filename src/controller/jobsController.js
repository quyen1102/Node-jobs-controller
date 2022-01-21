const User = require('../model/user')
const Job = require('../model/job')
const { StatusCodes } = require('http-status-codes')
const user = require('../model/user')

const getAllJobs = async (req, res, next) => {
   const jobs = await Job.find({createdBy: req.user.userID}).sort('createdAt')
   res.status(StatusCodes.OK).json({jobs: {jobs}, countJob: jobs.length})
}

const getJob = async (req, res, next) => {
   res.send('get  job')
}

const createJob = async (req, res, next) => {
   req.body.createdBy = req.user.userID
   
   const job = await Job.create(req.body)
   res.status(StatusCodes.CREATED).json({job})
}

const deleteJob = async (req, res, next) => {
   res.send('delete  job')
}

const updateJob = async (req, res, next) => {
   res.send('update  job')
}

module.exports = {
   getAllJobs,
   getJob,
   createJob,
   deleteJob,
   updateJob
}