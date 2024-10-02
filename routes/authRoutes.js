// routes/authRoutes.js
const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/authController')

// @route   POST /api/auth/register
// @desc    Registracija korisnika
// @access  Public
router.post('/register', register)

// @route   POST /api/auth/login
// @desc    Login korisnika
// @access  Public
router.post('/login', login)

module.exports = router
