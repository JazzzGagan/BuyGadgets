const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  pidx: { type: String, unique: true, required: true },
  transaction_id: String,
  amount: Number,
  status: String,
  fee: String,
  refunded: Boolean,
  createdAt: { type: Date, default: Date.now },
})

const Payment = mongoose.model('Payment', paymentSchema)
module.exports = Payment
