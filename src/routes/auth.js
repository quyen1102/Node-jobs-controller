const express = require('express')
const router = express.Router()

const {
   login,
   resgister
} = require('../controller/authController')

router.post('/resgister', resgister)
router.post('/login', login)


module.exports = router