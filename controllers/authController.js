const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { username, password, role } = req.body
  try {
    let user = await User.findOne({ username })
    if (user) return res.status(400).json({ msg: 'Korisnik već postoji' })

    user = new User({ username, password, role })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = { userId: user._id, role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(201).json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server greška')
  }
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    let user = await User.findOne({ username })
    if (!user) return res.status(400).json({ msg: 'Neispravni kredencijali' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ msg: 'Neispravni kredencijali' })

    const payload = { userId: user._id, role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server greška')
  }
}
