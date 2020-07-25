const express = require('express')

const {
  postMessage,
  getMessages
} = require('../controllers/initial')

const router = express.Router()

router.post('/', postMessage)
router.get('/', getMessages)
// router.get('/', initialMessage)

module.exports = router
