/* 月营收情况 */

module.exports = app => {
  const express = require('express')
  const router = express.Router()

  const Income = require('../../models/Income')

  router.post('/list', async (req, res) => {
    const model = await Income.find({curr_year: req.body.curr_year, curr_month: req.body.curr_month})
    if (model && model.length >= 0) {
      res.send({
        code: 0,
        objectResult: {
          list: model
        }
      })
    } else {
      res.send({
        code: -2,
        msg: '数据查询失败!'
      })
    }
  })

  /* 新增 */
  router.post('/add', async (req, res) => {
    if (req.body && req.body.curr_year && req.body.curr_month) {
      const model = await Income.find({curr_year: req.body.curr_year, curr_month: req.body.curr_month})
      if (model && model.length > 0) {
        res.send({
          code: -2,
          msg: '当前选中年份月份数据已经存在，不能继续新建!'
        })
      } else {
        const model2 = await Income.create(req.body)
        if (model2 && model2.curr_year !== '' && model2.curr_month !== '') {
          res.send({
            code: 0,
            msg: '新增数据信息成功!'
          })
        } else {
          res.send({
            code: -2,
            msg: '新增数据信息失败!'
          })
        }
      }
    }
  })

  /* update */
  router.post('/update', async (req, res) => {
    if (!req.body || !req.body.curr_year || req.body.curr_year === '' || !req.body.curr_month ||  req.body.curr_month === '') {
      res.send({
        code: -2,
        msg: '更新数据信息失败!'
      })
      return
    }
    const model = await Income.updateOne({curr_year: req.body.curr_year, curr_month: req.body.curr_month}, {...req.body})
    if (model && model.ok === 1) {
      res.send({
        code: 0,
        msg: '信息更新成功！'
      })
    } else {
      res.send({
        code: -2,
        msg: '信息更新失败!'
      })
    }
  })

  app.use('/income', router)

}