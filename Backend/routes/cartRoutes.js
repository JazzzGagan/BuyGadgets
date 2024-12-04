const express = require('express')
const {
  addToCart,
  getCartItem,
  removeItem,
  removeAllCartItems,
} = require('../controller/cartController')
const router = express.Router()

router.post('/additem', addToCart)
router.get('/getitem/:userId', getCartItem)
router.delete('/removeitem/:id', removeItem)
router.delete('/removeallitems', removeAllCartItems)

module.exports = router
