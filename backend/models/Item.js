const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'active'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Item', itemSchema)
