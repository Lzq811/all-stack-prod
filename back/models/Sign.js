/* 最新签约信息 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  money: String,
  productname: String,
  status: Boolean,
  newsign: Boolean,
  signdate: String
})

module.exports = mongoose.model('Sign', schema, 'sign')