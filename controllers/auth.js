const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({email: req.body.email}).exec()
  if (candidate) {
    if (bcrypt.compareSync(req.body.password, candidate.password)) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, require('../config/keys').jwt, {expiresIn: 3600})
      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Пользователь не существует или пароль неверный'
      })
    }
  } else {
    res.status(401).json({
      message: 'Пользователь не существует или пароль неверный'
    })
  }
}

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({email: req.body.email}).exec()
  if (candidate) {
    res.status(409).json({
      message: 'Такой Email уже используется'
    })
  } else {
    const salt = bcrypt.genSaltSync(11)
    const password = req.body.password

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
    try {
      await user.save()
      res.status(201).json({
        message: 'Пользователь создан',
        user
      })
    } catch (e) {
      console.log(e)
      errorHandler(res, e)
    }
  }
}