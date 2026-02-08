const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User')


dotenv.config()

const auth = async (req, res, next) => {
  
  try {
    const token = req.header('Authorization')
    
    if (!token) {
      return res.status(401).json({ message: 'Please Login' })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find user with token
    const user = await User.findOne({ _id: decoded.id, token: token })
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' })
    }

    // Attach user to request
    req.user = user
    next()

  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed', error: error.message })
  }

}

module.exports = auth
