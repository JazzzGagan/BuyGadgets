const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
  secure: true,
})

// console.log(cloudinary.config())
module.exports = cloudinary
