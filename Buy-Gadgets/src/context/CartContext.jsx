import axios from 'axios'
import { createContext, useState, useEffect, useContext } from 'react'
// const baseUrl = 'http://localhost:3000/api/getitem'

import { AuthContext } from './AuthContext'
export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext)
  const [cartCount, setCartCount] = useState(0)
  const [total, setTotal] = useState(0)
  const [cartItems, setCartItems] = useState([])

  const userId = user?.id

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getitem/${userId}`)
      .then((response) => {
        const mergedItems = response.data.reduce((acc, item) => {
          const existingItem = acc.find(
            (cartItem) =>
              cartItem.productId === item.productId &&
              cartItem.color === item.color
          )

          if (existingItem) {
            existingItem.quantity += item.quantity
          } else {
            acc.push(item)
          }
          return acc
        }, [])

        setCartItems(mergedItems)
        setTotal(
          mergedItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
        )
      })
      .catch((error) => {
        console.error('Error fetching cart items', error)
      })
  }, [user])

  const incrementQuantity = (_id, color) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id && item.color === color
          ? {
              ...item,
              quantity: item.quantity < 10 ? item.quantity + 1 : item.quantity,
            }
          : item
      )
    )
  }

  const decreaseQuantity = (_id, color) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id && item.color === color && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const removeItem = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/removeitem/${_id}`)
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== _id))
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  useEffect(() => {
    const storedCartCount = localStorage.getItem('cartCount')
    if (storedCartCount) {
      setCartCount(Number(storedCartCount))
    } else {
      setCartCount(0)
    }
  }, [])

  useEffect(() => {
    if (cartCount !== null) {
      localStorage.setItem('cartCount', JSON.stringify(cartCount))
      console.log('Saved cart count to localStorage:', cartCount)
    }
  }, [cartCount])

  const clearCart = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/removeallitems`, {
        data: { userId },
      }) // Send userId to the backend for deletion
      setCartItems([]) // Reset cartItems state locally
    } catch (error) {
      console.error('Error clearing cart items:', error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        cartItems,
        setCartItems,
        total,
        clearCart,
        removeItem,
        decreaseQuantity,
        incrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
