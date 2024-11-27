const asyncHandler = require('express-async-handler')
const cartItem = require('../models/cartInfo')

const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, productName, color, quantity, price, ImageUrl } =
    req.body
  console.log('test', typeof req.body.ImageUrl)

  if (
    !productId ||
    !productName ||
    !color ||
    !quantity ||
    !price ||
    !ImageUrl
  ) {
    res.status(400)
    throw new Error('Missing required fields')
  }

  if (!Array.isArray(ImageUrl)) {
    res.status(400)
    throw new Error('ImageUrl must be an array of strings')
  }

  const newCartItem = await cartItem.create({
    userId: userId || null,
    productId,
    productName,
    color,
    quantity,
    price,
    ImageUrl,
  })
  console.log(newCartItem)

  res.json({
    message: 'Item added to cart successfully',
    cartItem: newCartItem,
  })
})

const getCartItem = asyncHandler(async (req, res) => {
  const cartItems = await cartItem.find()
  res.status(200).json(cartItems)
})

module.exports = { addToCart, getCartItem }
