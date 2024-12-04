import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import esewa from '../../src/assets/images/Esewa.png'
import khalti from '../../src/assets/images/khalti.png'
import connectips from '../../src/assets/images/connectips.png'
import { AuthContext } from '../context/AuthContext'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const BillingInfo = () => {
  const { user } = useContext(AuthContext)

  const location = useLocation()
  const { cartItems, total } = location.state || { cartItems: [], total: 0 }
  const [selectedPayment, setSelectedPayment] = useState(null) // State for selected payment
  const paymentMethods = [
    { id: 'esewa', label: 'Esewa', image: esewa },
    { id: 'khalti', label: 'Khalti', image: khalti },
    { id: 'connectips', label: 'ConnectIPS', image: connectips },
  ]

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method)
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'Nepal',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postcode: '',
    phoneNumber: '',
    emailAddress: '',
    shippingFirstName: '',
    shippingLastName: '',
    shippingPhoneNumber: '',
    shippingEmailAddress: '',
    shippingZone: '',
    shippingAddress: '',
  })

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstname || '',
        lastName: user.lastname || '',
        emailAddress: user.email || '',
      }))
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked
    setFormData((prev) => ({
      ...prev,
      shippingFirstName: checked ? prev.firstName : '',
      shippingLastName: checked ? prev.lastName : '',
      shippingPhoneNumber: checked ? prev.phoneNumber : '',
      shippingEmailAddress: checked ? prev.emailAddress : '',
      shippingZone: checked ? prev.state : '',
      shippingAddress: checked ? prev.address : '',
    }))
  }

  const handlePayment = async (method) => {
    if (!selectedPayment) {
      alert('Please select a payment method.')
      return
    }
    const userId = user?.id
 

    const orderResponse = await axios.post(
      'http://localhost:3000/billing-info',
      {
        userId,
        formData,
        cartItems,
        paymentMethod: method,
        orderTotal: total,
      }
    )

    if (orderResponse.data.success) {
      console.log(orderResponse.data)

      return
    }
    if (method === 'khalti') {
      const payload = {
        return_url: 'http://localhost:5176/payment-sucess',
        website_url: 'http://localhost:5176',
        amount: total * 100,
        purchase_order_id: `Order_${uuidv4()}`,
        purchase_order_name: 'Gadget Purchase',
        customer_info: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.emailAddress,
          phone: formData.phoneNumber,
        },
        amount_breakdown: [
          {
            label: 'Mark Price',
            amount: total * 100,
          },

          {
            label: 'VAT',
            amount: (total * 13) / 100,
          },
        ],
        product_details: cartItems.map((item) => ({
          identity: item._id,
          name: item.productName,
          total_price: item.price * item.quantity * 100,
          quantity: item.quantity,
          unit_price: item.price * 100,
        })),
        merchant_username: 'ionSphereTech',
        merchant_extra: 'Some extra data here',
      }

      try {
        const response = await axios.post(
          'http://localhost:3000/khalti-proxy',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        if (response.status == 200) {
          console.log(response.data)
          window.location.href = response.data.payment_url
        } else {
          console.error('Error initiating payment', response.statusText)
        }
      } catch (error) {
        console.error(
          'Payment Error',
          error.response ? error.response.data : error.message
        )
      }
    }
  }

  const cities = ['Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur']
  const zones = ['Bagmati', 'Gandaki', 'Lumbini', 'Province 2']

  return (
    <div className="flex justify-between gap-8 p-6 max-w-5xl mx-auto">
      <div className="flex flex-col w-2/3 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Billing Information</h2>

        <div className="grid grid-cols-2 gap-6">
          {[
            {
              label: 'First Name*',
              name: 'firstName',
              type: 'text',
              required: true,
            },
            {
              label: 'Last Name*',
              name: 'lastName',
              type: 'text',
              required: true,
            },
            { label: 'Company Name', name: 'companyName', type: 'text' },
            {
              label: 'Country*',
              name: 'country',
              type: 'select',
              required: true,
              options: ['Nepal'],
            },
            { label: 'Apartment', name: 'apartment', type: 'text' },
            {
              label: 'City*',
              name: 'city',
              type: 'select',
              required: true,
              options: cities,
            },
            {
              label: 'State/Zone*',
              name: 'state',
              type: 'select',
              required: true,
              options: zones,
            },
            {
              label: 'Email Address*',
              name: 'emailAddress',
              type: 'email',
              required: true,
            },
            {
              label: 'Phone Number*',
              name: 'phoneNumber',
              type: 'text',
              required: true,
            },
          ].map(({ label, name, type, required, options }, idx) => (
            <div key={idx}>
              <label className="block font-semibold text-sm">{label}</label>
              {type === 'select' ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  required={required}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  placeholder={label.replace('*', '')}
                  required={required}
                />
              )}
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-4">Shipping Information</h3>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="sameAsBilling"
            className="mr-2"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="sameAsBilling">
            Billing address same as shipping address
          </label>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            {
              label: 'First Name*',
              name: 'shippingFirstName',
              type: 'text',
              required: true,
            },
            {
              label: 'Last Name*',
              name: 'shippingLastName',
              type: 'text',
              required: true,
            },
            {
              label: 'Phone Number*',
              name: 'shippingPhoneNumber',
              type: 'text',
              required: true,
            },
            {
              label: 'Email Address*',
              name: 'shippingEmailAddress',
              type: 'email',
              required: true,
            },
            {
              label: 'Zone*',
              name: 'shippingZone',
              type: 'text',
              required: true,
            },
            {
              label: 'Address*',
              name: 'shippingAddress',
              type: 'text',
              required: true,
            },
          ].map(({ label, name, type, required }, idx) => (
            <div key={idx}>
              <label className="block font-semibold text-sm">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 border rounded-md"
                placeholder={label.replace('*', '')}
                required={required}
              />
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-4">Collection & Payment</h3>
          <div className="grid grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handlePaymentSelect(method.id)}
                className={`cursor-pointer p-4 border rounded-lg flex flex-col items-center ${
                  selectedPayment === method.id
                    ? 'bg-gray-200 border-black shadow-lg'
                    : 'bg-white'
                }`}
              >
                <img
                  src={method.image}
                  alt={method.label}
                  className="w-16 h-16 object-contain mb-2"
                />
                <p className="text-sm font-semibold">{method.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/3 bg-gray-100 p-6 rounded-md shadow-md">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p>SubTotal</p>
              <p>NPR {total?.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between font-semibold">
              <p>Order Total</p>
              <p>NPR {total?.toFixed(2)}</p>
            </div>
          </div>

          <button
            className="w-full cursor-pointer bg-black text-white py-3 rounded-3xl mt-6 font-semibold"
            disabled={!selectedPayment}
            onClick={() => handlePayment(selectedPayment)}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default BillingInfo
