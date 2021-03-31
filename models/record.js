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
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    min: 1,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model('Record', recordSchema)