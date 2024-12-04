import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const formatINR = (amount) => {
  return amount.toLocaleString('en-IN')
}

const Checkout = () => {
  const location = useLocation()

  const { cartItems, total } = location.state || { cartItems: [], total: 0 }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8">Checkout</h1>

      {cartItems.length > 0 ? (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.ImageUrl[0]}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.productName}</h3>
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg text-gray-800">
                  NPR {formatINR(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}

      <div className="mt-8 flex justify-between items-center p-4 border-t">
        <h2 className="text-2xl font-semibold">
          Total: NPR {formatINR(total)}
        </h2>
        <Link to={{ pathname: '/billinginfo' }} state={{ cartItems, total }}>
          <button className="bg-black text-white font-semibold px-6 py-3 rounded-3xl hover:bg-gray-800 transition-colors">
            Proceed to Payment
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Checkout
