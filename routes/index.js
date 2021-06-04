const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const crud = require('./modules/crud')
const filter = require('./modules/filter')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')


router.use('/records', authenticator, crud)
router.use('/users', users)
router.use('/', authenticator, home)
// router.use('/', authenticator, filter)
module.exports = router