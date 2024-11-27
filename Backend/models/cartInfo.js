const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  productName: String,
  color: String,
  quantity: Number,
  price: Number,
  ImageUrl: [
    {
      type: String,
    },
  ],
})

const cartItem = mongoose.model('CartItem', cartSchema)
module.exports = cartItem
