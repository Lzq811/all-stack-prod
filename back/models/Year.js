const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  year: String,
  id: String,
  selectDefault: { type: Boolean, default: false }
})

module.exports = mongoose.model('Year', schema, 'year')