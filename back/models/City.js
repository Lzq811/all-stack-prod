/* 城市位置管理 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  value: String
})

module.exports = mongoose.model('City', schema, 'city')