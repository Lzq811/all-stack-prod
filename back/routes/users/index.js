module.exports = app => {
  const express = require('express')
  const md5 = require('md5')
  const router = express.Router()

  const User = require('../../models/User')

  router.post('/login', async (req, res) => {
    /* console.log(req.body)
    {
      encryptType: 'md5',
      timestamp: 1605186831245,
      password: 'e10adc3949ba59abbe56e057f20f883e',
      userName: 'admin'
    } */
    const model = await User.find({})
    res.send(model)
  })

  app.use('/user', router)
}