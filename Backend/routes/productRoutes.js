const express = require('express')
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  upload,
} = require('../controller/productController')
const router = express.Router()

router.post('/products', upload.array('imageUrl', 10), createProduct)
router.put('/products/:id', upload.array('imageUrl', 10), updateProduct)
router.delete('/products/:id', deleteProduct)
router.get('/products', getAllProduct)

module.exports = router
