/* 鹰才情况 */ 
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  curr_year: String,
  age_interval: String,
  name: String,
  sex: {type: String, default: '-'},
  constellation: String
})

module.exports = mongoose.model('Employee', schema, 'employee')