/* 月营收情况 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  income: {type: String, default: '0'},
  cost: {type: String, default: '0'},
  gross: {type: String, default: '0'},
  fee_total: {type: String, default: '0'},
  profit: {type: String, default: '0'},
  curr_year: String,
  month: String
})

module.exports = mongoose.model('Income', schema, 'income')