const httpStatus = require('http-status')

module.exports = [
  // General Errors
  {
    name: 'InternalServerError',
    message: httpStatus['500_MESSAGE'],
    status: httpStatus.INTERNAL_SERVER_ERROR,
    errorCode: 1000
  }, {
    name: 'NotFoundError',
    message: httpStatus['404_MESSAGE'],
    status: httpStatus.NOT_FOUND,
    errorCode: 1001
  }, {
    name: 'AuthorizationError',
    message: 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    errorCode: 1002
  },
  {
    name: 'TokenExpiredError',
    message: 'Jwt expired.',
    status: httpStatus.BAD_REQUEST,
    errorCode: 1003
  },
  {
    name: 'EmailAlreadyExists',
    message: 'Email alerady in use.',
    status: httpStatus.BAD_REQUEST,
    errorCode: 1004
  }
]
