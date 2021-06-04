const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const Filter = require('../../config/filter')

router.get('/', (req, res) => {
  const userId = req.user._id
  const time = req.query.time || ''
  const [year, month] = time.split('-')
  const categoryfilter = req.query.filter || ''

  Record.find(Filter(categoryfilter, userId))
    .sort({ date: 'desc' })
    .lean()
    .then(records => {
      if (time) {
        records = records.filter(each => {
          if (each.date.includes(year) && each.date.includes(month)) {
            return each
          }
        })
      }
      const totalAmountList = []
      records.forEach(data => totalAmountList.push(Number(data.amount)))
      let totalAmount = totalAmountList.reduce((acc, cur) => acc + cur, 0)
      Category.find({})
        .lean()
        .then(category => res.render('index', {
          records,
          category,
          categoryfilter,
          totalAmount,
          time
        }))
    })
    .catch(err => console.error(err))

})

module.exports = router