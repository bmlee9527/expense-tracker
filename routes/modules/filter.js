const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.post('/', (req, res) => {
  const filter = req.body.filter
  Record.find({ category: [filter] })
    .lean()
    .then(records => res.render('index', { records, filter }))
    .catch(error => console.error(error))
})



module.exports = router