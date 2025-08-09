const jwt = require('jsonwebtoken')
const authToken = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : undefined
    const token = req.cookies.access_token || headerToken
    if (!token) {
      return res.status(401).json({
        message: 'Provide token',
        error: true,
        success: false,
      })
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        message: 'Token verification failed',
        error: true,
        success: false,
      })
    }
    req.userId = decoded.id
    return next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
      error: true,
      success: false,
    })
  }
}

module.exports = authToken;