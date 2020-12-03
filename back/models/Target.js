/* 业务发展目标 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  curr_year: String,
  order: String,
  title: String,
  target: String,
  real: String,
  rate: String
})

module.exports = mongoose.model('Target', schema, 'target')