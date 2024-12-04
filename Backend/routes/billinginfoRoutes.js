const express = require('express')
const { billingInfo, orderInfos } = require('../controller/billingController')
const router = express.Router()

router.post('/billing-info', billingInfo)
router.get('/order-info/:userId', orderInfos)

module.exports = router
