const User = require('../model/user')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, res, next) => {
   res.send('get all jobs')
}

const getJob = async (req, res, next) => {
   res.send('get  job')
}

const createJob = async (req, res, next) => {
   res.json(req.user)
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