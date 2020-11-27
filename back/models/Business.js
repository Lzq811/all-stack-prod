/* 签约情况 */ 
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  curr_year: {type: String, required: true},
  key: {type: String, required: true},
  name: String,
  count: {type: String}, // 签约数量
  constract: {type: String}, // 签约合同金额
  post: {type: String}, // 过账客户
  done: {type: String}, // 收入完结客户
  working: {type: String}, // 进行中客户
  bad: {type: String}, // 坏账客户
  noremoney: {type: String}, // 未回款
  remoney: {type: String} // 回款
})

module.exports = mongoose.model('Business', schema, 'business')