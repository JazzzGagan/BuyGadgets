import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { Snackbar, Alert } from '@mui/material'

const baseUrl = 'http://localhost:3000/api/getitem'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setCartItems(response.data)
        const totalCost = response.data.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )
        setTotal(totalCost)
      })
      .catch((error) => {
        console.error('Error fetching cart items', error)
      })
  }, [])

  const removeItem = async (productId) => {
    axios
      .delete(`http://localhost:3000/api/removeitem/${productId}`)
      .then((response) => {
        console.log('sucessfully item deleted')
      })
      .catch((error) => {
        console.error('Error deleting item', error)
      })
  }

  const incrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: item.quantity < 10 ? item.quantity + 1 : item.quantity,
            }
          : item
      )
    )

    const item = cartItems.find((item) => item.productId === productId)
    if (item && item.quantity >= 10) {
      setOpen(true)
    }
  }

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    )
  }

  useEffect(() => {
    const totalCost = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    )
    setTotal(totalCost)
  }, [cartItems])

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
              <tr key={item.productId} className="text-center">
                <td className="border-t border-b text-left">
                  <img
                    src={item.ImageUrl[0]}
                    alt="images"
                    className="max-w-40 h-auto"
                  />
                  {item.productName}
                </td>
                <td className="border-t border-b p-2">
                  ${item.price.toFixed(2)}
                </td>
                <td className="border-t border-b p-2">{item.color}</td>
                <td className="border-t border-b ">
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      className="w-10 h-10 font-semibold text-2xl bg-slate-200"
                      onClick={() => incrementQuantity(item.productId)}
                    >
                      +
                    </button>

                    <h1>{item.quantity}</h1>

                    <button
                      className="w-10 h-10 font-semibold text-2xl bg-slate-200"
                      onClick={() => decreaseQuantity(item.productId)}
                    >
                      -
                    </button>
                  </div>
                </td>
                <td className="border-t border-b p-2">
                  ${item.price * item.quantity.toFixed(2)}{' '}
                  <FontAwesomeIcon
                    onClick={() => removeItem(item.productId)}
                    icon={faXmark}
                    className="rounded-full text-lg w-6 h-6 text-black bg-slate-400"
                  />{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}
      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  )
}

export default CartPage
