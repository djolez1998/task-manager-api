// app.js
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')

// Učitaj environment varijable
dotenv.config()

// Poveži se na MongoDB
connectDB()

const app = express()

// Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Rute
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/tasks', require('./routes/taskRoutes'))
app.use('/api/projects', require('./routes/projectRoutes'))

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Server Error' })
})

// Dodaj jednostavan zaštićeni endpoint za testiranje
app.get(
  '/api/test',
  require('./middleware/authMiddleware').auth,
  (req, res) => {
    res.json({ msg: 'Token je validan', user: req.user })
  }
)

module.exports = app
