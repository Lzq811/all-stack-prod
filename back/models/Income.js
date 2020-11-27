/* 月营收情况 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  afc_income: {type: String, default: '0'},
  afc_cost: {type: String, default: '0'},
  afc_gross: {type: String, default: '0'},
  afc_fee_total: {type: String, default: '0'},
  afc_profit: {type: String, default: '0'},
  zjw_income: {type: String, default: '0'},
  zjw_cost: {type: String, default: '0'},
  zjw_gross: {type: String, default: '0'},
  zjw_fee_total: {type: String, default: '0'},
  zjw_profit: {type: String, default: '0'},
  total_income: {type: String, default: '0'},
  total_cost: {type: String, default: '0'},
  total_gross: {type: String, default: '0'},
  total_fee_total: {type: String, default: '0'},
  total_profit: {type: String, default: '0'},
  curr_year: String,
  curr_month: String,
})

module.exports = mongoose.model('Income', schema, 'income')