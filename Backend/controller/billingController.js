const asyncHandler = require('express-async-handler')
const express = require('express')
const BillingInfo = require('../models/billingInfo')

const billingInfo = async (req, res) => {
  try {
    const userId = req.body.userId
    const { formData, cartItems, paymentMethod, orderTotal } = req.body

    if ((!userId, !formData || !cartItems || !paymentMethod || !orderTotal)) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const {
      firstName,
      lastName,
      companyName,
      country,
      address,
      apartment,
      city,
      state,
      postcode,
      phoneNumber,
      emailAddress,
      shippingFirstName,
      shippingLastName,
      shippingPhoneNumber,
      shippingEmailAddress,
      shippingZone,
      shippingAddress,
    } = formData

    const billingDetails = new BillingInfo({
      userId,
      firstName,
      lastName,
      companyName,
      country,
      address,
      apartment,
      city,
      state,
      postcode,
      phoneNumber,
      emailAddress,
      shippingFirstName,
      shippingLastName,
      shippingPhoneNumber,
      shippingEmailAddress,
      shippingZone,
      shippingAddress,
      cartItems,
      paymentMethod,
      orderTotal,
    })

    const savedInfo = await billingDetails.save()

    res
      .status(201)
      .json({ message: 'Billing information saved', data: savedInfo })
  } catch (error) {
    console.error('Error saving billing info:', error.message)
    res.status(500).json({ error: 'Failed to save billing info' })
  }
}

const orderInfos = asyncHandler(async (req, res) => {
  const { userId } = req.body.userId
  console.log(req.body)

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' })
  }

  try {
    const billingInfo = await BillingInfo.find({ userId })
    res.status(200).json(billingInfo)
  } catch (error) {
    console.error('Error fetching cart items:', error)
    res.status(500).json({ error: 'Failed to fetch cart items.' })
  }
})

module.exports = { billingInfo, orderInfos }
