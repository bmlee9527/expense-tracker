const mongoose = require('mongoose')
const Record = require('../record')
const recordSeeder = require('./record.json')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < recordSeeder.record.length; i++) {
    Record.create({
      name: recordSeeder.record[i].name,
      category: recordSeeder.record[i].category,
      categoryIcom: recordSeeder.record[i].categoryIcom,
      date: recordSeeder.record[i].date,
      amount: recordSeeder.record[i].amount,
    }).then(() => {
      return db.close()
    })
  }
  console.log('done')
})
