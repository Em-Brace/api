const jsonwebtoken = require('jsonwebtoken')
const { jwt } = require('../../config')
const httpStatus = require('http-status')
const { TokenExpiredError } = require('./errors')
// const {
//   REGISTRATION_EMAIL,
//   RESET_PASSWORD_EMAIL
// } = require('../constants/emails')
const { toMilliseconds } = require('../utils/datetime')
const uuidv1 = require('uuid/v1')

const decodeEmailJwt = async (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, jwt.mail.secret)
    return decoded
  } catch (err) {
    console.log(err)
    throw new TokenExpiredError('Email token has expired.', httpStatus.BAD_REQUEST)
  }
}

const generateEmailJwt = async (data) => {
  const token = jsonwebtoken.sign(data, jwt.mail.secret, {
    expiresIn: toMilliseconds(jwt.mail.expiresIn).toString(),
    jwtid: uuidv1()
  })
  return token
}

const decodePasswordResetJwt = async (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, jwt.reset_password.secret)
    return decoded
  } catch (err) {
    console.log(err)
    throw new TokenExpiredError('Email token has expired.', httpStatus.BAD_REQUEST)
  }
}

const generatePasswordResetJwt = async (data) => {
  const token = jsonwebtoken.sign(data, jwt.reset_password.secret, {
    expiresIn: toMilliseconds(jwt.reset_password.expiresIn).toString(),
    jwtid: uuidv1()
  })
  return token
}

const decodeAccessJwt = async (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, jwt.access_token.secret)
    return decoded
  } catch (err) {
    throw new TokenExpiredError('Access token has expired.', httpStatus.BAD_REQUEST)
  }
}

const generateAccessJwt = async (data) => {
  const token = jsonwebtoken.sign(data, jwt.access_token.secret, {
    expiresIn: toMilliseconds(jwt.access_token.expiresIn).toString(),
    jwtid: uuidv1()
  })
  return token
}

module.exports = {
  decodeEmailJwt,
  generateEmailJwt,
  decodePasswordResetJwt,
  generatePasswordResetJwt,
  decodeAccessJwt,
  generateAccessJwt
}
