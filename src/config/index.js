const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../.env') })

const {
  NODE_ENV,
  NODE_PORT,

  APP_FRONTEND_URL,

  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,

  MAIL_SECRET,
  MAIL_SECRET_LIFETIME,
  MAIL_PROVIDER,
  SENDGRID_API_KEY,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_AUTH,
  SENDING_MAIL,
  MAIL_TEMPLATE_PATH,

  ACCESS_JWT_SECRET,
  ACCESS_JWT_SECRET_EXPIRES_IN,

  RESET_PASSWORD_JWT_SECRET,
  RESET_PASSWORD_JWT_SECRET_EXPIRES_IN
} = process.env

module.exports = {
  nodeEnv: NODE_ENV,
  nodePort: NODE_PORT,
  app: {
    base_frontend_url: APP_FRONTEND_URL
  },
  database: {
    username: DB_USER,
    password: DB_PASS,
    name: DB_NAME,
    host: DB_HOST,
    port: DB_PORT
  },

  jwt: {
    mail: {
      secret: MAIL_SECRET,
      expiresIn: MAIL_SECRET_LIFETIME
    },
    reset_password: {
      secret: RESET_PASSWORD_JWT_SECRET,
      expiresIn: RESET_PASSWORD_JWT_SECRET_EXPIRES_IN || '5 seconds',
      audience: 'app-reset-password-emails'
    },

    access_token: {
      secret: ACCESS_JWT_SECRET,
      expiresIn: ACCESS_JWT_SECRET_EXPIRES_IN || '5 minutes',
      audience: 'web-app'
    }
  },
  mails: {
    sendgrid_api_key: SENDGRID_API_KEY,
    mail_provider: MAIL_PROVIDER,
    sending_mail: SENDING_MAIL,
    template_path: MAIL_TEMPLATE_PATH
  },

  smtp: {
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    user: SMTP_USER,
    pass: SMTP_PASS,
    auth: SMTP_AUTH
  }
}
