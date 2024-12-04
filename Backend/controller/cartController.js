const asyncHandler = require('express-async-handler')
const cartItem = require('../models/cartInfo')

const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, productName, color, quantity, price, ImageUrl } =
    req.body

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

  res.json({
    message: 'Item added to cart successfully',
    cartItem: newCartItem,
  })
})

const getCartItem = asyncHandler(async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' })
  }

  try {
    const cartItems = await cartItem.find({ userId })
    res.status(200).json(cartItems)
  } catch (error) {
    console.error('Error fetching cart items:', error)
    res.status(500).json({ error: 'Failed to fetch cart items.' })
  }
})
const removeItem = asyncHandler(async (req, res) => {
  const { id } = req.params
  console.log(req.params)

  const removedItem = await cartItem.findOneAndDelete({ _id: id })

  if (removedItem) {
    res.status(200).json({
      message: 'Product deleted successfully',
      product: removedItem,
    })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const removeAllCartItems = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' })
  }

  try {
    await cartItem.deleteMany({ userId })
    res.status(200).json({ message: 'All cart items deleted successfully.' })
  } catch (error) {
    console.error('Error deleting cart items:', error)
    res.status(500).json({ error: 'Failed to delete cart items.' })
  }
}

module.exports = { addToCart, getCartItem, removeItem, removeAllCartItems }
