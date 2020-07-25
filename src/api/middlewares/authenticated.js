const { decodeAccessJwt } = require('../utils/jwt')
const { userSerializer } = require('../serializers/user')

const isAuthenticated = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' })
  }

  const token = getToken(req.headers.authorization)

  try {
    var tokenData = await decodeAccessJwt(token)
  } catch (err) {
    return next(err)
  }

  req.user = userSerializer(tokenData.user)

  next()
}

const getToken = (header) => {
  const parts = header.split(' ')
  return parts[1]
}
module.exports = {
  isAuthenticated
}
