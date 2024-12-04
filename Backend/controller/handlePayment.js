const asyncHanlder = require('express-async-handler')
const Payment = require('../models/PaymentModel')
const axios = require('axios')

const initiatePayment = asyncHanlder(async (req, res) => {
  const payload = {
    amount: req.body.amount,
    return_url: req.body.return_url,
    website_url: req.body.website_url,
    purchase_order_id: req.body.purchase_order_id,
    purchase_order_name: req.body.purchase_order_name,
  }
  try {
    const khaltiResponse = await axios.post(
      'https://a.khalti.com/api/v2/epayment/initiate/',
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    res.status(200).json(khaltiResponse.data)
  } catch (error) {
    console.error(
      'Error with Khalti API:',
      error.response?.data || error.message
    )
    res
      .status(500)
      .json({ error: error.response?.data || 'Internal Server Error' })
  }
})

const handleCallBack = asyncHanlder(async (req, res) => {
  const { pidx } = req.query

  if (!pidx) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  try {
    const lookupResponse = await axios.post(
      'https://a.khalti.com/api/v2/epayment/lookup/',
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (lookupResponse.data.status === 'Completed') {
      // console.log('Payment confirmed:', lookupResponse.data)
      const existingPayment = await Payment.findOne({ pidx })
      if (existingPayment) {
        return res.status(200).json({ message: 'Payment already processed.' })
      }

      const payment = new Payment({
        pidx: lookupResponse.data.pidx,
        transaction_id: lookupResponse.data.transaction_id,
        amount: lookupResponse.total_amount,
        status: lookupResponse.data.status,
        fee: lookupResponse.data.fee,
        refunded: lookupResponse.data.refunded,
      })

      await payment.save()

      res
        .status(200)
        .json({ message: 'Payment processed successfully.', payment })
    } else {
      res.status(400).json({ error: 'Payment not completed' })
    }
  } catch (error) {
    console.error(
      'Error verifying payment:',
      error.response?.data || error.message
    )
    res.status(500).json({ error: 'Error verifying payment' })
  }
})

module.exports = { initiatePayment, handleCallBack }
