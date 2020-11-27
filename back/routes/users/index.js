module.exports = app => {
  const express = require('express')
  const md5 = require('md5')
  const router = express.Router()

  const User = require('../../models/User')

  /* 登陆api */
  router.post('/login', async (req, res) => {
    const model = await User.find({username: req.body.username})
    if (model && model.length === 1) {
      if (md5(model[0].password) === req.body.password) {
        res.send({
          code: 0,
          msg: '登录成功!',
          objectResult: { token: md5(model[0].password) }
        })
      } else {
        res.send({
          code: -2,
          msg: '您输入的密码有误!'
        })
      }
    } else {
      res.send({
        code: -1,
        msg: '您输入的账号或密码有误!'
      })
    }
  })

  /* 查询所有users */
  router.post('/list', async (req, res) => {
    const model = await User.find()
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
        msg: '用户数据查询失败!'
      })
    }
  })

  /* 根据id删除数据 */
  router.post('/delete', async (req, res) => {
    if (!req.body.username || req.body.username === '') {
      res.send({
        code: -2,
        msg: '删除失败!'
      })
      return
    }
    const model = await User.find({username: req.body.username})
    if (model && model.length > 0) {
      const model2 = await User.deleteOne({username: req.body.username})
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
    if (!req.body.username || req.body.username === '') {
      res.send({
        code: -2,
        msg: '新增用户失败!'
      })
      return
    }
    const model = await User.find({username: req.body.username})
    if (model && model.length > 0) {
      res.send({
        code: -2,
        msg: '该用户已经注册！'
      })
    } else {
      const model2 = await User.create(req.body)
      if (model2 && model2._id !== '') {
        res.send({
          code: 0,
          msg: '新增用户信息成功!'
        })
      } else {
        res.send({
          code: -2,
          msg: '新增用户失败!'
        })
      }
    }
  })

  /* update */
  router.post('/update', async (req, res) => {
    if (!req.body.id || req.body.id === '' || !req.body.username || req.body.username === '' || !req.body.password || req.body.password === '') {
      res.send({
        code: -2,
        msg: '更新用户失败!'
      })
      return
    }
    const model = await User.updateOne({_id: req.body.id}, {username: req.body.username, password: req.body.password})
    if (model && model.ok === 1) {
      res.send({
        code: 0,
        msg: '用户信息更新成功！'
      })
    } else {
      res.send({
        code: -2,
        msg: '用户信息更新失败!'
      })
    }
  })

  app.use('/user', router)
}