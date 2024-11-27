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
  })

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    setProductData({ ...productData, imageUrl: files })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', productData.name)
    formData.append('brand', productData.brand)
    formData.append('category', productData.category)
    formData.append('overview', productData.overview)
    formData.append('description', productData.description)
    formData.append('specs', productData.specs)
    formData.append('price', productData.price)
    formData.append('discount', productData.discount)
    formData.append('stockQuantity', productData.stockQuantity)

    productData.imageUrl.forEach((file) => {
      formData.append('imageUrl', file)
    })

    // const productJson = {
    //   [productData.brand.toLowerCase()]: {
    //     [productData.category]: [
    //       {
    //         productname: productData.name,
    //         overview: productData.overview,
    //         description: productData.description,
    //         specification: productData.specs,
    //         price: productData.price,
    //         discount: productData.discount,
    //         stockQuantity: productData.stockQuantity,
    //         images: productData.imageUrl.map((file) => file.name),
    //       },
    //     ],
    //   },
    // }
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
      alert('SucessFully Added')

      console.log(response.data)
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || error.message || 'An error occurred'

      console.error(errorMsg)
    }
  }

  return (
    <div className="w-[40%] h-[70vh]absolute left-0 right-0 bottom-0 top-0 m-auto ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-10 text-white "
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
          required
        />
        <input
          type="text"
          name="overview"
          placeholder="Overview"
          onChange={handleChange}
          className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          onChange={handleChange}
          className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
          required
        />
        <textarea
          type="text"
          name="specs"
          placeholder="Specifications"
          onChange={handleChange}
          className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
          required
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount"
          onChange={handleChange}
          className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
        />

        <input
          type="number"
          name="stockQuantity"
          placeholder="Stock Quantity"
          onChange={handleChange}
          className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
          required
        />

        <input
          type="file"
          name="imageUrl"
          multiple
          onChange={handleFileChange}
          className="w-full border-0 border-b-2 bg-transparent border-white focus:outline-none focus:border-b-[#007bff] transition-colors duration-100"
          required
        />

        <button type="submit" className="w-full h-[5vh] font-bold bg-[#6c757d]">
          Upload Product
        </button>
      </form>
    </div>
  )
}

export default AdminUploadProduct
