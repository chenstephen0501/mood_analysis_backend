const express = require('express')
const router = express.Router()

const apiRouter = require('./apis')

router.use('/api', apiRouter)

module.exports = router