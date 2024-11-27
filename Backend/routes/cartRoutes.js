const express = require('express')
const { addToCart, getCartItem } = require('../controller/cartController')
const router = express.Router()

router.post('/additem', addToCart)
router.get('/getitem', getCartItem)

module.exports = router
