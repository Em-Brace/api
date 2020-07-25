const { findById } = require('../repository/user')

const isAdmin = async (req, res, next) => {
  try {
    var user = await findById(req.user.id)
    if (user.role === 'admin') {
      return next()
    }
    res.status(401)
    return res.json({ status: 401, message: 'Not authorized!' })
  } catch (err) {
    res.status(401)
    return res.json({ status: 401, message: 'Not authorized!' })
  }
}

module.exports = {
  isAdmin
}
