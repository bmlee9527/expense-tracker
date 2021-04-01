const mongoose = require('mongoose')
const Category = require('../category')
const categorySeeder = require('./category.json')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < categorySeeder.category.length; i++) {
    Category.create({
      category: categorySeeder.category[i].category,
      categoryIcom: categorySeeder.category[i].categoryIcom,
    }).then(() => {
      return db.close()
    })
    console.log('done')

  }
})
