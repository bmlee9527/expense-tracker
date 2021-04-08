const Category = require('../category')
const categorySeeder = require('./category.json')

const db = require('../../config/mongoose')


db.once('open', () => {
  console.log('mongodb connected!')
  Category.create(categorySeeder.category)
    .then(() => {
      return db.close()
    })
  console.log('done')
})
