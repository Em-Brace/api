const Joi = require('@hapi/joi')
const PasswordComplexity = require('joi-password-complexity')

const registerUserSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  name: Joi.string().required(),
  password: new PasswordComplexity(),
  password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
})

const sendResetPasswordSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required()
})

const loginSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required()
})

const resetPasswordSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: new PasswordComplexity(),
  password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
})

module.exports = {
  registerUserSchema,
  sendResetPasswordSchema,
  resetPasswordSchema,
  loginSchema
}
