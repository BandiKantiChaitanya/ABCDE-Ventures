const express = require('express')
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const auth = require('../middleware/auth')

const router = express.Router()

// Create order from cart 
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user._id

    const cart = await Cart.findOne({ user_id: userId })

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' })
    }

    const order = new Order({
      user_id: userId,
      items: cart.items
    })

    await order.save()

    cart.items = []
    await cart.save()

    res.json({ message: 'Order placed successfully', order })
  } catch (err) {
    res.status(500).json({ message: 'Order failed' })
  }
})


// List all orders for user 
router.get('/', auth, async (req, res) => {
  try {
    // console.log(req)
    const orders = await Order.find({ user_id: req.user._id })
      .populate('items') // <-- THIS populates item details
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' })
  }
})


module.exports = router
