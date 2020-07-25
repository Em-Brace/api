
const bcrypt = require('bcrypt')
const UserRepo = require('../repositories/user')
const {
  generateEmailJwt,
  generateAccessJwt,
  decodeEmailJwt,
  generatePasswordResetJwt,
  decodePasswordResetJwt
} = require('../utils/jwt')
const { sendRegistrationMail, sendResetPasswordMail } = require('../services/mail')

const {
  validateUserRegister,
  validateLogin,
  validateSendResetPasswordMail,
  validateResetPassword
} = require('../validation/index')

const logger = require('../../config/winston')

const { nodeEnv } = require('../../config')

const register = async (req, res, next) => {
  try {
    const userData = await validateUserRegister(req.body)
    userData.password = await bcrypt.hash(userData.password, 10)
    const user = await UserRepo.register(userData)

    const token = await generateEmailJwt({ email: user.email })
    sendRegistrationMail({ user, token })

    if (nodeEnv === 'dev') {
      return res.json({ status: 201, message: `${user.email} created.`, token: token })
    }

    res.status(201)
    res.json({ message: `${user.name} registration successfull.` })
  } catch (err) {
    logger.log({
      level: 'error',
      message: 'THIS IS MY ERROR'
    })

    console.log(err)
    // console.log(JSON.stringify(err.response.body.errors))
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const userData = await validateLogin(req.body)
    const user = await UserRepo.getUser({ email: userData.email })

    if (!user || !user.isValid) {
      res.status(401)
      return res.json({ status: 400, message: 'Credentials does not match our data.' })
    }

    const passwordsMatch = await bcrypt.compare(userData.password, user.password)

    if (!passwordsMatch) {
      res.status(401)
      return res.json({ status: 400, message: 'Credentials does not match our data.' })
    }

    const token = await generateAccessJwt({ user: user })

    res.status(200)
    // res.cookie('jwt', token, { maxAge: toMilliseconds(jwt.access_token.expiresIn), httpOnly: true});
    return res.json({ status: 200, message: 'Login successfull.', access_token: token, user: user })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const verifyEmail = async (req, res, next) => {
  try {
    const decoded = await decodeEmailJwt(req.params.email_verification_jwt)
    await UserRepo.verifyEmail(decoded.email)
    res.status(200)
    return res.json({ status: 200, message: 'Email verified.' })
  } catch (err) {
    return next(err)
  }
}

const resetPasswordMail = async (req, res, next) => {
  try {
    const userData = await validateSendResetPasswordMail(req.body)

    const user = await UserRepo.getUser({ email: userData.email })
    const token = await generatePasswordResetJwt({ email: user.email })
    const info = await sendResetPasswordMail({ user, token })

    res.status(200)

    if (nodeEnv === 'dev') {
      return res.json({ status: 200, message: `Reset password email sent.`, info: info, token: token })
    }

    return res.json({ status: 200, message: 'Reset password email sent.' })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const passwordReset = async (req, res, next) => {
  try {
    const userData = await validateResetPassword(req.body)
    const decoded = await decodePasswordResetJwt(req.params.reset_password_jwt)
    const passwordHash = await bcrypt.hash(userData.password_confirmation, 10)

    console.log(decoded.email)

    const reset = await UserRepo.resetPassword({ email: decoded.email, password: passwordHash })
    console.log(reset)
    res.status(200)
    return res.json({ status: 200, message: 'Password reset.' })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}

module.exports = {
  register,
  login,
  verifyEmail,
  passwordReset,
  resetPasswordMail
}
