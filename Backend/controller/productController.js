const asyncHandler = require('express-async-handler')
const Product = require('../models/productInfo')
const multer = require('multer')
const cloudinary = require('../config/cloudinaryConfig')
const fs = require('fs')
const { response } = require('express')
const upload = multer({ dest: 'uploads/' })

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    category,
    overview,
    specs,
    description,
    price,
    discount,
    stockQuantity,
    colors,
  } = req.body

  if (
    !name ||
    !brand ||
    !category ||
    !overview ||
    !specs ||
    !description ||
    !price ||
    !stockQuantity ||
    !colors
  ) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }

  const imageUrls = []

  console.log('test', req.files)

  for (const file of req.files) {
    const localFilePath = file.path

    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      folder: 'products',
    })

    imageUrls.push(uploadResult.secure_url)

    fs.unlinkSync(localFilePath)
  }

  console.log('Received body:', req.body)
  console.log('Received files:', req.files)

  const product = await Product.create({
    name,
    brand,
    category,
    overview,
    specs,
    description,
    price,
    discount,
    stockQuantity,
    colors: JSON.parse(colors),
    imageUrl: imageUrls,
  })

  const responseJson = {
    [brand.toLowerCase()]: {
      [category]: [
        {
          productname: name,
          overview: `${brand} | ${overview}`,
          description,
          specification: specs,
          price,
          discount,
          stockQuantity,
          colors: JSON.parse(colors), // Include colors in the response
          images: imageUrls,
        },
      ],
    },
  }

  res.status(201).json({ message: 'Product added successfully!', responseJson })
})

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    brand,
    discount,
    specs,
    stockQuantity,
  } = req.body

  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product Not Found')
  }

  const imageUrls = product.imageUrl || []

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const localFilePath = file.path
      const uploadResult = await cloudinary.uploader.upload(localFilePath, {
        folder: 'products',
      })
      imageUrls.push(uploadResult.secure_url)
      fs.unlinkSync(localFilePath)
    }
  }

  product.name = name || product.name
  product.brand = brand || product.brand
  product.category = category || product.category
  product.specs = specs || product.specs
  product.description = description || product.description
  product.price = price || product.price
  product.discount = discount || product.discount
  product.stockQuantity = stockQuantity || product.stockQuantity
  if (imageUrls.length > 0) {
    product.imageUrl = [...product.imageUrl, ...imageUrls]
  }

  const updatedProduct = await product.save()
  res.status(200).json({ test: updatedProduct })
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.deleteOne({ _id: req.params.id })
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  if (products && products.length > 0) {
    const responseJson = {}

    products.forEach((product) => {
      const {
        _id,
        brand,
        category,
        name,
        overview,
        description,
        specs,
        price,
        discount,
        stockQuantity,
        imageUrl,
        colors,
      } = product

      if (!responseJson[brand.toLowerCase()]) {
        responseJson[brand.toLowerCase()] = {}
      }

      if (!responseJson[brand.toLowerCase()][category]) {
        responseJson[brand.toLowerCase()][category] = []
      }

      responseJson[brand.toLowerCase()][category].push({
        id: _id,
        productname: name,
        overview: `${brand} | ${overview}`,
        description,
        specification: specs,
        price,
        discount,
        stockQuantity,
        images: imageUrl,
        colors,
      })
    })

    res.status(200).json(responseJson)
    console.log(responseJson)
  } else {
    res.status(404)
    throw new Error('Products not found')
  }
})

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  upload,
}
