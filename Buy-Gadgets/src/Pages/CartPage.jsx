import React, { useEffect, useState, useRef, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Snackbar, Alert } from '@mui/material'
import { CartContext } from '../context/CartContext'

// const baseUrl = 'http://localhost:3000/api/getitem'

const CartPage = () => {
  // const [cartItems, setCartItems] = useState([])
  // const recentResponse = useRef([])
  const { cartItems, total, incrementQuantity, decreaseQuantity, removeItem } =
    useContext(CartContext)
  // const [total, setTotal] = useState(0)
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  // useEffect(() => {
  //   axios
  //     .get(baseUrl)
  //     .then((response) => {
  //       const mergedItems = response.data.reduce((acc, item) => {
  //         const existingItem = acc.find(
  //           (cartItem) =>
  //             cartItem.productId === item.productId &&
  //             cartItem.color === item.color
  //         )

  //         if (existingItem) {
  //           existingItem.quantity += item.quantity
  //         } else {
  //           acc.push(item)
  //         }
  //         return acc
  //       }, [])

  //       recentResponse.current = mergedItems
  //       setCartItems(mergedItems)
  //       const totalCost = mergedItems.reduce(
  //         (acc, item) => acc + item.price * item.quantity,
  //         0
  //       )
  //       setTotal(totalCost)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching cart items', error)
  //     })
  // }, [])

  // const incrementQuantity = (_id, color) => {
  //   setCartItems((prevItems) => {
  //     const updatedItems = prevItems.map((item) =>
  //       item._id === _id && item.color === color
  //         ? {
  //             ...item,
  //             quantity: item.quantity < 10 ? item.quantity + 1 : item.quantity,
  //           }
  //         : item
  //     )

  //     const updatedItem = updatedItems.find(
  //       (item) => item._id === _id && item.color === color
  //     )

  //     if (updatedItem && updatedItem.quantity >= 10) {
  //       setOpen(true)
  //     }

  //     return updatedItems
  //   })
  // }

  // const decreaseQuantity = (_id, color) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item._id === _id && item.color === color && item.quantity > 1
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   )
  // }

  // useEffect(() => {
  //   const totalCost = cartItems.reduce(
  //     (acc, item) => acc + item.quantity * item.price,
  //     0
  //   )
  //   setTotal(totalCost)
  // }, [cartItems])

  // const removeItem = async (_id) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/api/removeitem/${_id}`)
  //     setCartItems((prevItems) => prevItems.filter((item) => item._id !== _id))
  //     console.log('Item removed successfully')
  //   } catch (error) {
  //     console.error('Error removing item:', error)
  //   }
  // }

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={handleClose}>
          Maximum quantity reached!
        </Alert>
      </Snackbar>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length > 0 ? (
        <table className="w-full border-collapse border-t border-b border-gray-200">
          <thead>
            <tr>
              <th className="border-t border-b p-2 text-left">Product</th>
              <th className="border-t border-b p-2">Price</th>
              <th className="border-t border-b p-2">Color</th>
              <th className="border-t border-b p-2 w-56">Quantity</th>
              <th className="border-t border-b p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="border-t border-b text-left">
                  <img
                    src={item.ImageUrl[0]}
                    alt="images"
                    className="max-w-40 h-auto"
                  />
                  {item.productName}
                </td>
                <td className="border-t border-b p-2">
                  NPR{item.price.toFixed(2)}
                </td>
                <td className="border-t border-b p-2">{item.color}</td>
                <td className="border-t border-b ">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      className="w-10 h-10 font-semibold text-2xl bg-slate-200"
                      onClick={() => incrementQuantity(item._id, item.color)}
                    >
                      +
                    </button>

                    <h1>{item.quantity}</h1>

                    <button
                      className="w-10 h-10 font-semibold text-2xl bg-slate-200"
                      onClick={() => decreaseQuantity(item._id, item.color)}
                    >
                      -
                    </button>
                  </div>
                </td>
                <td className="border-t border-b p-2">
                  NPR{' '}
                  {(item.price * item.quantity).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{' '}
                  <FontAwesomeIcon
                    onClick={() => removeItem(item._id)}
                    icon={faXmark}
                    className="rounded-full text-lg w-6 h-6 text-black cursor-pointer bg-slate-400"
                  />{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}
      <div className="mt-6  flex flex-col items-end justify-evenly h-28 text-right">
        Total: NPR{' '}
        {total.toLocaleString('en-IN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        <Link to={{ pathname: '/checkout' }} state={{ cartItems, total }}>
          <button className=" bg-black text-white tracking-wider  font-semibold h-12 w-24 rounded-3xl">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CartPage
