const express = require('express')
const Cart = require('../models/Cart')
const Item = require('../models/Item')
const auth = require('../middleware/auth')



const router = express.Router()

// Add items to cart 
router.post('/', auth, async (req, res) => {
  try {
    const { itemIds } = req.body  
    const userId = req.user._id

    // Find or create the user's cart
    let cart = await Cart.findOne({ user_id: userId })
    if (!cart) {
      cart = new Cart({ user_id: userId, items: [] })
    }

    // Validate item IDs
    const validItems = await Item.find({ _id: { $in: itemIds } })
    const validItemIds = validItems.map(item => item._id)

    // Add to cart
    cart.items.push(...validItemIds)
    await cart.save()

    res.json({ message: 'Items added to cart', cart })

  } catch (error) {
    res.status(500).json({ message: 'Failed to add items to cart', error: error.message })
  }
})

// Get current user's cart
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id
    const cart = await Cart.findOne({ user_id: userId }).populate('items')

    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty' })
    }

    res.json(cart)

  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart', error: error.message })
  }
})

module.exports=router
