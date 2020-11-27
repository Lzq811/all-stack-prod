/* city */
module.exports = app => {
  const express = require('express')
  const router = express.Router()

  const City = require('../../models/City')

  router.post('/list', async (req, res) => {
    const model = await City.find().sort('-signdate') // 根据 签约日期 倒排序
    if (model && model.length >= 0) {
      res.send({
        code: 0,
        objectResult: {
          list: model
        }
      })
    } else {
      res.send({code: -2, msg: '查询失败!'})
    }
  })

  router.post('/add', async (req, res) => {
    if (!req.body) {
      res.send({code: -2, msg: '新增失败！'})
      return
    }
    const modelc = await City.find({title: req.body.title})
    if (modelc && modelc.length > 0) {
      res.send({code: -2, msg: '该项目名称已经存在，不能重复添加!'})
      return
    }
    const model = await City.create({...req.body})
    if (model && model._id) {
      res.send({code: 0, msg: '新增成功!'})
    } else {
      res.send({code: -2, msg: '新增失败!'})
    }
  })

  router.post('/update', async (req, res) => {
    if (!req.body || !req.body.id) {
      res.send({code: -2, msg: '更新失败！'})
      return
    }
    const model = await City.updateOne({_id: req.body.id}, {...req.body})
    if (model && model.ok === 1) {
      res.send({code: 0, msg: '更新成功!'})
    } else {
      res.send({code: -2, msg: '更新失败!'})
    }
  })

  router.post('/delete', async (req, res) => {
    if (!req.body || !req.body.id) {
      res.send({code: -2, msg: '删除失败！'})
      return
    }
    const model = await City.deleteOne({_id: req.body.id})
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

  app.use('/city', router)
}