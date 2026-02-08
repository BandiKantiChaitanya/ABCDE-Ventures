const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User')
const auth = require('../middleware/auth')

dotenv.config()
const router = express.Router()

// Signup
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const user = new User({
      username,
      password: hashedPassword
    })

    await user.save()
    res.status(201).json({ message: 'User created successfully' })

  } catch (error) {
    res.status(500).json({ message: 'Signup failed', error: error.message })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'Invalid username' })
    }

    // Check single-device token
    if (user.token) {
      return res.status(403).json({ message: 'You cannot login on another device' })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    user.token = token
    await user.save()

    res.json({ token })

  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message })
  }
})

// Logout 
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.token = null
    await req.user.save()

    res.json({ message: 'Logged out successfully' })

  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error: error.message })
  }
})

module.exports = router
