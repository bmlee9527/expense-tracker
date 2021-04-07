const Category = require('../category')
const categorySeeder = require('./category.json')

const db = require('../../config/mongoose')


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
