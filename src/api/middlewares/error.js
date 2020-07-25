const httpStatus = require('http-status')
const core = require('mongodb-core')

const {
  ExtendableError,
  InternalServerError,
  NotFoundError,
  ValidationError,
  EmailAlreadyExists
} = require('../utils/errors')
const { nodeEnv } = require('../../config')
const winston = require('../../config/winston')

const mongoErrorParser = (err) => {
  if (err.errmsg.substring(0, 80) === 'E11000 duplicate key error collection: express_auth.users index: email_1 dup key') {
    return new EmailAlreadyExists('Email already in use.')
  }
}

const normalizer = (err, req, res, next) => {
  if (!(err instanceof ExtendableError)) {
    if (err instanceof core.MongoError) {
      return handler(mongoErrorParser(err), req, res)
    }

    return handler(new InternalServerError('Internal Server Error', httpStatus.INTERNAL_SERVER_ERROR, 1000, err.stack), req, res)
  }
  return handler(err, req, res)
}

const notFound = (req, res, next) => {
  return handler(new NotFoundError('Not Found', httpStatus.NOT_FOUND), req, res)
}

const handler = (err, req, res, next) => {
  const resp = {
    statusCode: err.status,
    errorCode: err.errorCode,
    message: err.message || httpStatus[err.status],
    stack: err.stack
  }

  if (err instanceof ValidationError) {
    delete resp.message
    resp.errors = err.mapped()
  }

  if (nodeEnv !== 'development') {
    delete resp.stack
  }

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${JSON.stringify(err)} - ${req.originalUrl} - ${req.method} - ${req.ip}`)

  res.status(err.status).json(resp)
}

module.exports = {
  normalizer,
  notFound,
  handler
}
