const bcrypt = require('bcryptjs')
const Record = require('../record')
const recordSeeder = require('./record.json').record
const User = require('../user')

const db = require('../../config/mongoose')


const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
}]




db.once('open', () => {
  console.log('mongodb connected!')
  SEED_USER.forEach((user) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: recordSeeder.length },
          (_, i) => Record.create({
            ...recordSeeder[i], userId
          })
        ))
      })
      .then(() => {
        console.log('done')
        process.exit()
      })
  })
})