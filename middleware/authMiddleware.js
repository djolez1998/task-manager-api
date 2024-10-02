const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.auth = async (req, res, next) => {
  const authHeader = req.header('Authorization')
  if (!authHeader)
    return res.status(401).json({ msg: 'Nema tokena, autorizacija odbijena' })

  const token = authHeader.split(' ')[1]
  if (!token)
    return res.status(401).json({ msg: 'Nema tokena, autorizacija odbijena' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.userId).select('-password')
    if (!req.user) return res.status(401).json({ msg: 'Autorizacija odbijena' })
    next()
  } catch (err) {
    console.error(err.message)
    res.status(401).json({ msg: 'Token nije validan' })
  }
}

exports.admin = (req, res, next) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ msg: 'Pristup odbijen' })
  next()
}
