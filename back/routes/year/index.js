/* 关于 年份 管理内容的 api */
module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const Year = require('../../models/Year')

  router.post('/list', async (req, res) => {
    const model = await Year.find()
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

  /* 根据id删除数据 */
  router.post('/delete', async (req, res) => {
    if (!req.body.id || req.body.id === '') {
      res.send({
        code: -2,
        msg: '删除失败!'
      })
      return
    }
    const model = await Year.find({id: req.body.id})
    console.log(model)
    if (model && model.length > 0) {
      const model2 = await Year.deleteOne({id: req.body.id})
      if (model2 && model2.ok === 1) {
        res.send({
          code: 0,
          msg: '删除成功!'
        })
      }
    } else {
      res.send({
        code: -2,
        msg: '删除失败!'
      })
    }
  })

  /* 新增 */
  router.post('/add', async (req, res) => {
    if (!req.body.year || req.body.year === '') {
      res.send({
        code: -2,
        msg: '新增用户失败!'
      })
      return
    }
    const model = await Year.find({year: req.body.year})
    if (model && model.length > 0) {
      res.send({
        code: -2,
        msg: '该年份已经创建！'
      })
    } else {
      const model2 = await Year.create(req.body)
      if (model2 && model2.id !== '') {
        res.send({
          code: 0,
          msg: '新增年份信息成功!'
        })
      } else {
        res.send({
          code: -2,
          msg: '新增年份信息失败!'
        })
      }
    }
  })

  /* update */
  router.post('/update', async (req, res) => {
    if (!req.body.id || req.body.id === '' || !req.body.year || req.body.year === '') {
      res.send({
        code: -2,
        msg: '更新年份信息失败!'
      })
      return
    }
    const model = await Year.updateOne({_id: req.body.key}, {id: req.body.id, year: req.body.year})
    if (model && model.ok === 1) {
      res.send({
        code: 0,
        msg: '年份信息更新成功！'
      })
    } else {
      res.send({
        code: -2,
        msg: '年份信息更新失败!'
      })
    }
  })

  /* 选择默认选择的值 */
  router.post('/select', async (req, res) => {
    if (!req.body.id || req.body.id === '') {
      res.send({
        code: -2,
        msg: '选择默认显示年份失败!'
      })
      return
    }
    const list = await Year.find()
    if (list && list.length > 0) {
      list.forEach(async item => {
        await Year.updateOne({id: item.id}, {selectDefault: false})
      })
    }
    const model = await Year.updateOne({id: req.body.id}, {selectDefault: true})
    if (model && model.ok === 1) {
      res.send({
        code: 0,
        msg: '选择默认显示年份成功！'
      })
    } else {
      res.send({
        code: -2,
        msg: '选择默认显示年份失败!'
      })
    }
  })

  app.use('/year', router)
}