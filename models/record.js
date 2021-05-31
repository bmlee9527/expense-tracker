const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  categoryIcom: {
    type: String,
  },
  date: {
    type: String,
    required: true
  },
  merchant: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    min: 1,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }

})


module.exports = mongoose.model('Record', recordSchema)