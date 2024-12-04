import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'

const Payment_Sucess = () => {
  const { cartItems, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const [params] = useSearchParams()
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [orderDetails, setOrderDetails] = useState(null)

  useEffect(() => {
    const verifyPayment = async () => {
      const pidx = params.get('pidx')
      const status = params.get('status')

      if (status === 'Completed') {
        try {
          const response = await axios.get(
            `http://localhost:3000/payment-callback?pidx=${pidx}`
          )
          setStatus('success')
          setMessage('Payment was successful!')
          console.log(response.data)

          const userId = user?.id
          if (userId) {
            try {
              await axios.delete(`http://localhost:3000/api/removeallitems`, {
                data: { userId },
              })
              clearCart()
              console.log(`All cart items for user ${userId} deleted.`)
              const orderResponse = await axios.get(
                `http://localhost:3000/order-info?userId=${userId}`
              )
              setOrderDetails(orderResponse.data)
            } catch (deleteError) {
              console.error('Error deleting cart items:', deleteError)
            }
          } else {
            console.error('User ID not found in context.')
          }
        } catch (error) {
          setStatus('error')
          setMessage('Error verifying payment. Please contact support.')
          console.error(error)
        }
      } else if (status === 'Pending') {
        setStatus('pending')
        setMessage('Payment is still pending. Please wait or contact support.')
      } else {
        setStatus('failed')
        setMessage('Payment was canceled or failed. Please try again.')
      }
    }

    verifyPayment()
  }, [params, cartItems, user])

  return (
    <div>
      <h1>Payment Status</h1>
      <p>Status: {status}</p>
      <p>{message}</p>

      {orderDetails && (
        <div>
          <h2>Order Summary</h2>
          <p>Order ID: {orderDetails._id}</p>
          <p>Payment Method: {orderDetails.paymentMethod}</p>
          <p>Order Total: ${orderDetails.orderTotal}</p>
          <p>Order Time: {new Date(orderDetails.createdAt).toLocaleString()}</p>
          <p>
            Estimated Arrival Time:{' '}
            {new Date(orderDetails.createdAt)
              .setDate(new Date().getDate() + 7)
              .toLocaleString()}
          </p>

          <h3>Shipping Details</h3>
          <p>
            Name: {orderDetails.shippingFirstName}{' '}
            {orderDetails.shippingLastName}
          </p>
          <p>Email: {orderDetails.shippingEmailAddress}</p>
          <p>Phone: {orderDetails.shippingPhoneNumber}</p>

          <h3>Ordered Items</h3>
          {orderDetails.cartItems.map((item) => (
            <div key={item._id}>
              <p>Product Name: {item.productName}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
              <img src={item.ImageUrl[0]} alt={item.productName} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Payment_Sucess
