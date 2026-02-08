const express = require('express')
const Item = require('../models/Item')


const router = express.Router()

// Create a new item 
router.post('/', async (req, res) => {
  try {
    const { name, status } = req.body

    const item = new Item({
      name,
      status: status || 'active'
    })

    await item.save()
    res.status(201).json({ message: 'Item created successfully', item })

  } catch (error) {
    res.status(500).json({ message: 'Failed to create item', error: error.message })
  }
})

// List all items 
router.get('/', async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items', error: error.message })
  }
})

module.exports = router
