const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'My Cart'
  },
  status: {
    type: String,
    default: 'active' // e.g. active, ordered
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Cart', cartSchema)
