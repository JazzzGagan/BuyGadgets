const express = require('express')
const {
  initiatePayment,
  handleCallBack,
} = require('../controller/handlePayment')
const router = express.Router()

router.post('/khalti-proxy', initiatePayment)
router.get('/payment-callback', handleCallBack)

module.exports = router
