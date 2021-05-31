const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('', (req, res) => {
  const userId = req.user._id
  const { name, Category, date, amount } = req.body
  let [category, categoryIcom] = Category.split('/')
  return Record.create({ name, category, categoryIcom, date, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, Category, date, amount } = req.body
  let [category, categoryIcom] = Category.split('/')
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name,
        record.category = category,
        record.categoryIcom = categoryIcom,
        record.date = date,
        record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router