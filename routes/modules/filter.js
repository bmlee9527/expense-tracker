const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.post('/', (req, res) => {
  const filter = req.body.filter
  const amount = Record.aggregate([
    {
      $match: { category: filter }
    },
    {
      $group: { _id: null, amount: { $sum: "$amount" } }
    }
  ]).exec()

  const records = Record.aggregate([
    {
      $match: { category: filter }
    },
    {
      $project: {
        name: 1,
        category: 1,
        categoryIcom: 1,
        amount: 1,
        date: 1
      },
    },
    {
      $sort: {
        date: -1
      }
    }
  ]).exec()

  Promise.all([amount, records])
    .then(([amount, records]) => {
      const totalAmount = amount[0] || { amount: '尚未有消費' }
      console.log(totalAmount)
      res.render('index', { totalAmount, records, filter })
    })
    .catch(error => console.log(error))
})



module.exports = router
