const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  const amount = Record.aggregate([
    {
      $match: { userId }
    }
    ,
    {
      $group: { _id: null, amount: { $sum: "$amount" } }
    }
  ]).exec()
  const records = Record.aggregate([
    {
      $match: { userId }
    }
    ,
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
      res.render('index', { totalAmount, records })
    })
    .catch(error => console.log(error))
})

module.exports = router