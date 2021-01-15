module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://afc:afcroot@47.112.1.127:27017/demo?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true, useUnifiedTopology: true })
}