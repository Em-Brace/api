const express = require('express')

const {
  register,
  login,
  verifyEmail,
  resetPasswordMail,
  passwordReset
} = require('../controllers/user')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/verify/:email_verification_jwt', verifyEmail)
router.post('/send-reset-email', resetPasswordMail)
router.post('/password-reset/:reset_password_jwt', passwordReset)

module.exports = router
