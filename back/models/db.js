module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://demo:Lzq31311@3.129.46.226:27017/demo?authSource=demo&readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true, useUnifiedTopology: true })
}