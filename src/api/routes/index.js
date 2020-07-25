const express = require('express')

const userRoutes = require('./user')

const router = express.Router()

router.get('/test', (req, res, next) => {
  return res.json({ msg: 'test' })
})

router.use('/users', userRoutes)

module.exports = router
