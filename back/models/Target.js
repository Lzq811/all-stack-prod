/* 业务发展目标 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  contract_target: {type: String, default: '0'},
  contract_real: {type: String, default: '0'},
  contract_rate: {type: String, default: '0'},
  firstpay_target: {type: String, default: '0'},
  firstpay_target: {type: String, default: '0'},
  firstpay_real: {type: String, default: '0'},
  firstpay_rate: {type: String, default: '0'},
  payrate_target: {type: String, default: '0'},
  payrate_real: {type: String, default: '0'},
  payrate_rate: {type: String, default: '0'},
  rateofmargin_target: {type: String, default: '0'},
  rateofmargin_real: {type: String, default: '0'},
  rateofmargin_rate: {type: String, default: '0'},
  profit_target: {type: String, default: '0'},
  profit_real: {type: String, default: '0'},
  profit_rate: {type: String, default: '0'},
  cost_target: {type: String, default: '0'},
  cost_real: {type: String, default: '0'},
  cost_rate: {type: String, default: '0'},
  income_target: {type: String, default: '0'},
  income_real: {type: String, default: '0'},
  income_rate: {type: String, default: '0'},
  curr_year: String
})

module.exports = mongoose.model('Target', schema, 'target')