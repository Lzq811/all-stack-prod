/* 月营收情况 */

module.exports = app => {
  const express = require('express')
  const router = express.Router()

  const Income = require('../../models/Income')

  router.post('/list', async (req, res) => {
    const model = await Income.find({curr_year: req.body.curr_year, month: req.body.month})
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
    if (req.body && req.body.curr_year && req.body.month) {
      const model = await Income.find({curr_year: req.body.curr_year, month: req.body.month, title: req.body.title})
      if (model && model.length > 0) {
        res.send({
          code: -2,
          msg: '当前选中年份月份数据已经存在，不能继续新建!'
        })
      } else {
        const model2 = await Income.create(req.body)
        if (model2 && model2.curr_year !== '') {
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
    if (!req.body || !req.body.id) {
      res.send({
        code: -2,
        msg: '更新数据信息失败!'
      })
      return
    }
    const model = await Income.updateOne({_id: req.body.id}, {...req.body})
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

  router.post('/delete', async (req, res) => {
    if (!req.body || !req.body.id) {
      res.send({code: -2, msg: '删除失败！'})
      return
    }
    const model = await Income.deleteOne({_id: req.body.id})
    if (model && model.ok === 1) {
      res.send({
        code: 0,
        msg: '删除信息成功!'
      })
    } else {
      res.send({
        code: -2,
        msg: '数据删除失败!'
      })
    }
  })

  app.use('/income', router)

}