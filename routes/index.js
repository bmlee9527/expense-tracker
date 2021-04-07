const express = require('express')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)

const crud = require('./modules/crud')
router.use('/records', crud)

const filter = require('./modules/filter')
router.use('/', filter)

module.exports = router