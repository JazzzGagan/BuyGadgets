import React, { useState } from 'react'
import axios from 'axios'

const AdminUploadProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    category: '',
    overview: '',
    description: '',
    specs: '',
    price: '',
    discount: '',
    stockQuantity: '',
    imageUrl: [],
    colors: [],
  })

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setProductData({ ...productData, imageUrl: files })
  }

  const handleColorChange = (e) => {
    const colorValue = e.target.value.trim()
    if (colorValue && !productData.colors.includes(colorValue)) {
      setProductData((prev) => ({
        ...prev,
        colors: [...prev.colors, colorValue],
      }))
    }
    e.target.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    Object.keys(productData).forEach((key) => {
      if (key === 'imageUrl') {
        productData[key].forEach((file) => formData.append(key, file))
      } else if (key === 'colors') {
        formData.append(key, JSON.stringify(productData[key]))
      } else {
        formData.append(key, productData[key])
      }
    })

    try {
      const response = await axios.post(
        'http://localhost:3000/api/products',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      alert('Product added successfully!')
      console.log(response.data)
    } catch (error) {
      console.error(error.response?.data?.message || error.message || 'Error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-black text-gray-300 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Upload Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {[
            { name: 'name', placeholder: 'Product Name' },
            { name: 'brand', placeholder: 'Brand' },
            { name: 'category', placeholder: 'Category' },
            { name: 'overview', placeholder: 'Overview' },
            { name: 'price', placeholder: 'Price', type: 'number' },
            { name: 'discount', placeholder: 'Discount', type: 'number' },
            {
              name: 'stockQuantity',
              placeholder: 'Stock Quantity',
              type: 'number',
            },
          ].map(({ name, placeholder, type = 'text' }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          ))}
        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          rows={3}
          required
        ></textarea>

        <textarea
          name="specs"
          placeholder="Specifications"
          onChange={handleChange}
          className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          rows={3}
        ></textarea>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium mb-2 text-white"
          >
            Upload Images
          </label>
          <input
            type="file"
            name="imageUrl"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="colors"
            className="block text-sm font-medium mb-2 text-white"
          >
            Add Colors (Press Enter to Add)
          </label>
          <input
            type="text"
            id="colors"
            placeholder="Enter a color"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleColorChange(e)
              }
            }}
            className="w-full p-3 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {productData.colors.map((color, index) => (
              <span
                key={index}
                className="bg-gray-500 text-black px-3 py-1 rounded-full"
              >
                {color}
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-gray-700 text-white font-bold rounded hover:bg-gray-600 transition duration-200"
        >
          Upload Product
        </button>
      </form>
    </div>
  )
}

export default AdminUploadProduct
