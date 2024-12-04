/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import ImageSlider from './ImageSlider'
import axios from 'axios'
import { CartContext } from '../../context/CartContext'

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('')
  const { user } = useContext(AuthContext)
  const { cartCount, setCartCount, duplicateItem, cartItems } =
    useContext(CartContext)

  if (!product) {
    return <p>No product data availabe</p>
  }

  const AddToCart = async () => {
    if (!selectedColor) {
      alert('Please select a color.')
      return
    }

    const cartItem = {
      productId: product.id,
      productName: product.productname,
      color: selectedColor,
      quantity: parseInt(quantity, 10) || 1,
      price: product.discount,
      ImageUrl: [],
    }
    product.images.forEach((files) => {
      cartItem.ImageUrl.push(files)
    })

    if (user?.id) {
      cartItem.userId = user.id
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/additem',
        cartItem,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      alert(response.data.message)
      // duplicateItem(cartItem)
      console.log('test', cartItem)

      setCartCount(cartCount + 1)
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert(error.response?.data?.error || 'Failed to add item to cart')
    }
  }

  return (
    <div className="product-details flex h-[120vh]  w-full">
      <div className="imageSlide w-[50%] h-auto ">
        <ImageSlider images={product.images} />
      </div>
      <div className="imageSlide w-[50%] h-auto">
        <div className="w-[80%] h-auto m-auto mt-40">
          <h1 className="text-5xl ">{product.productname}</h1>

          <p>{product.overview}</p>
          <br />
          <ul>
            {product.description.split('\n').map((desc, index) => (
              <li key={index}>
                {index === 0 ? <strong>{desc}</strong> : desc}
              </li>
            ))}
          </ul>

          <br />
          <ul>
            {product.specification.split('\n').map((spec, index) => (
              <li key={index}>
                {index === 0 ? <strong>{spec}</strong> : spec}
              </li>
            ))}
          </ul>

          <br />

          <div className="quantity-selector">
            <label htmlFor="quantity">Select Quantity:</label>
            <input
              className="w-10 text-center  h-10 border border-gray-500"
              type="number"
              id="qunatity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <br />
          <div className="color-slector w-full h-10  ">
            <label htmlFor="color">Color: </label>
            <select
              id="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className=" border border-gray-300  focus:ring-blue-200 text-sm w-96 h-8"
              required
            >
              <option value="">---Please Select---</option>
              {product.colors.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <br />
          <br />
          <div className="pricing text-2xl font-extrabold">
            <p className="line-through text-red-600 "> NPR {product.price}</p>
            <p>NPR {product.discount}</p>
          </div>
          <br />
          <div className="action-buttons w-28 h-10 flex items-center justify-center border border-grey-300 rounded-full">
            <button onClick={AddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
