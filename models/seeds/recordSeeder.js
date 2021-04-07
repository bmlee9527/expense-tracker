const Record = require('../record')
const recordSeeder = require('./record.json')

const db = require('../../config/mongoose')

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
