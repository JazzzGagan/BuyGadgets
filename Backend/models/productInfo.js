const mongoose = require('mongoose')

const ProduceSchemna = new mongoose.Schema(
  {
    name: String,
    brand: String,
    category: String,
    overview: String,
    specs: String,
    description: String,
    price: Number,
    discount: Number,
    stockQuantity: Number,
    imageUrl: [{ type: String }],
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', ProduceSchemna)
module.exports = Product
