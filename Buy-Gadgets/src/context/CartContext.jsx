import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(null)

  useEffect(() => {
    const storedCartCount = localStorage.getItem('cartCount')
    if (storedCartCount) {
      setCartCount(Number(storedCartCount))
    } else {
      setCartCount(0) // Default to 0 if no value in storage
    }
  }, [])

  useEffect(() => {
    if (cartCount !== null) {
      localStorage.setItem('cartCount', JSON.stringify(cartCount))
      console.log('Saved cart count to localStorage:', cartCount)
    }
  }, [cartCount])

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  )
}
