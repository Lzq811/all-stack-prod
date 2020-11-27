const express = require('express')

const cors = require('cors')

const UserApi = require('./routes/users')
const YearApi = require('./routes/year')
const TargetApi = require('./routes/target')
const IncomeApi = require('./routes/income')
const EmployeeApi = require('./routes/employee')
const BusinessApi = require('./routes/business')
const SignApi = require('./routes/sign')
const CompanyApi = require('./routes/company')
const CityApi = require('./routes/city')
const ProdApi = require('./routes/prod')

const DB = require('./models/db')

const app = new express()

app.use(cors())
app.use(express.json()) // 这个才能用 req.body 拿到请求参数

UserApi(app)
YearApi(app)
TargetApi(app)
IncomeApi(app)
EmployeeApi(app)
BusinessApi(app)
SignApi(app)
CompanyApi(app)
CityApi(app)
ProdApi(app)
DB(app)

app.listen(5000, err => {
  if (err) throw err
  console.log('服务启动成功!')
})