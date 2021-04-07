const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const record = require('./models/record')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


const app = express()

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs',
  helpers: { eq: function (v1, v2) { return (v1 === v2) } }
}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  const amount = Record.aggregate([
    {
      $group: { _id: null, amount: { $sum: "$amount" } }
    }
  ]).exec()
  const records = Record.aggregate([
    {
      $project: {
        name: 1,
        category: 1,
        categoryIcom: 1,
        amount: 1,
        date: 1
      }
    }
  ]).exec()

  Promise.all([amount, records])
    .then(([amount, records]) => {
      const totalAmount = amount[0]
      res.render('index', { totalAmount, records })
    })
    .catch(error => console.log(error))
})


app.get('/records/new', (req, res) => {
  return res.render('new')
})
app.post('/records', (req, res) => {
  const { name, Category, date, amount } = req.body
  let [category, categoryIcom] = Category.split('/')
  return Record.create({ name, category, categoryIcom, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/records/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, Category, date, amount } = req.body
  let [category, categoryIcom] = Category.split('/')
  return Record.findById(id)
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

app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/', (req, res) => {
  const filter = req.body.filter
  Record.find({ category: [filter] })
    .lean()
    .then(records => res.render('index', { records, filter }))
    .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})