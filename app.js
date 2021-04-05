const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const Category = require('./models/category')
const record = require('./models/record')
const bodyParser = require('body-parser')


const app = express()

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs',
  helpers: { eq: function (v1, v2) { return (v1 === v2) } }
}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.error(error))
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

app.post('/records/:id/edit', (req, res) => {
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

app.post('/records/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})