const sgMail = require('@sendgrid/mail')
const nodemailer = require('nodemailer')
const { smtp, app, mails } = require('../../config')
const { compileTemplate } = require('../utils/mails')
const logger = require('../../config/winston')

const {
  REGISTRATION_EMAIL,
  RESET_PASSWORD_EMAIL
} = require('../constants/emails')

sgMail.setApiKey(mails.sendgrid_api_key)

const smtpClient = nodemailer.createTransport({
  host: smtp.host,
  port: smtp.port,
  secureConnection: smtp.secure || false,
  auth: {
    user: smtp.user,
    pass: smtp.pass
  }
})

const sendmail = async (mail) => {
  switch (mails.mail_provider.toLowerCase()) {
    case 'smtp':
      return smtpClient.sendMail(mail, (err, info) => {
        if (err) {
          logger.info('=== MALITRAP ERROR ===')
          logger.error(err)
        }
      })

    case 'sendgrid':
      return sgMail.send(mail)
  }
}

const sendRegistrationMail = async ({ user, token }) => {
  const verificationUrl = `${app.base_frontend_url}/#/verify-email/${token}`
  const html = await compileTemplate(REGISTRATION_EMAIL.template, { verificationUrl })

  const info = sendmail({
    from: 'info@rng.com',
    to: user.email,
    html: html,
    subject: REGISTRATION_EMAIL.subject
  })
  return info
}

const sendResetPasswordMail = async ({ user, token }) => {
  const resetPasswordUrl = `${app.base_frontend_url}/reset-password/${token}`
  const html = await compileTemplate(RESET_PASSWORD_EMAIL.template, { resetPasswordUrl })
  console.log(app.base_frontend_url)

  return sendmail({
    from: 'info@evilcorp.com',
    to: user.email,
    html: html,
    subject: RESET_PASSWORD_EMAIL.subject
  })
}

module.exports = {
  sendmail,
  sendRegistrationMail,
  sendResetPasswordMail
  //   sendResetPasswordMail
}
