const express = require('express')
const router = express.Router()

const {
   getAllJobs,
   getJob,
   createJob,
   deleteJob,
   updateJob
} = require('../controller/jobsController')

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router