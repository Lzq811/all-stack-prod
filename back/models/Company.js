/* 公司简介 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  value: String,
  order: String
})

module.exports = mongoose.model('Company', schema, 'company')