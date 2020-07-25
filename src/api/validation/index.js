
const validate = require('./validator')

const {
  registerUserSchema,
  sendResetPasswordSchema,
  resetPasswordSchema,
  loginSchema
} = require('./schemas')

const validateUserRegister = async (body) => {
  return validate(body, registerUserSchema)
}

// const validateEmailIsUnique = async (email) => {
//   return User.findOne({ where: { email: email } })
// }

const validateSendResetPasswordMail = async (body) => {
  return validate(body, sendResetPasswordSchema)
}

const validateResetPassword = async (body) => {
  return validate(body, resetPasswordSchema)
}

const validateLogin = async (body) => {
  return validate(body, loginSchema)
}

module.exports = {
  validateUserRegister,
  // validateEmailIsUnique,
  validateSendResetPasswordMail,
  validateResetPassword,
  validateLogin
}
