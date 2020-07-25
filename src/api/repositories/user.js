const User = require('../models/user')

const register = async (userData) => {
  try {
    return User.create(userData)
  } catch (err) {
    console.log(JSON.stringify(err))
  }
}

const getUser = async (identity) => {
  return User.findOne(identity)
}

const verifyEmail = async (email) => {
  return User.updateOne({ email: email }, { isValid: true })
}

// const resetPassword = async ({ email, password }) => {
//   return User.updateOne({ password: password }, { where: { email: email } })
// }

const resetPassword = async ({ email, password }) => {
  return User.updateOne({ email: email }, { password: password })
}

module.exports = {
  register,
  getUser,
  verifyEmail,
  resetPassword
}
