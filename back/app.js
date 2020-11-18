const express = require('express')

const cors = require('cors')

const UserApi = require('./routes/users')

const DB = require('./models/db')

const app = new express()

app.use(cors())
app.use(express.json()) // 这个才能用 req.body 拿到请求参数

UserApi(app)
DB(app)

app.listen(5000, err => {
  if (err) throw err
  console.log('服务启动成功!')
})