/* 业务发展目标 */

module.exports = app => {
  const express = require('express')
  const router = express.Router()

  const Target = require('../../models/Target')

  router.post('/list', async (req, res) => {
    const model = await Target.find({curr_year: req.body.curr_year})
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
        msg: '年份数据查询失败!'
      })
    }
  })

  /* 新增 */
  router.post('/add', async (req, res) => {
    if (req.body && req.body.curr_year) {
      const model = await Target.find({curr_year: req.body.curr_year, title: req.body.title}).sort(Number('order'))
      if (model && model.length > 0) {
        res.send({
          code: -2,
          msg: '当前名称数据已经存在，不能继续新建!'
        })
      } else {
        const model2 = await Target.create(req.body)
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
    if (!req.body || req.body.curr_year === '' || req.body.id === '') {
      res.send({
        code: -2,
        msg: '更新数据信息失败!'
      })
      return
    }
    const model = await Target.updateOne({_id: req.body.id}, {...req.body})
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
    const model = await Target.deleteOne({_id: req.body.id})
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

  app.use('/target', router)

}