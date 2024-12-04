const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    productName: String,
    color: String,
    quantity: Number,
    price: Number,
    ImageUrl: [String],
  },
  { _id: false }
)

const billingInfoSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    companyName: String,
    country: { type: String, required: true },
    address: String,
    apartment: String,
    city: String,
    state: String,
    postcode: String,
    phoneNumber: String,
    emailAddress: { type: String, required: true },
    shippingFirstName: { type: String, required: true },
    shippingLastName: { type: String, required: true },
    shippingPhoneNumber: String,
    shippingEmailAddress: { type: String },
    shippingZone: String,
    shippingAddress: String,
    cartItems: [cartItemSchema],
    paymentMethod: { type: String, required: true },
    orderTotal: { type: Number, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('BillingInfo', billingInfoSchema)
