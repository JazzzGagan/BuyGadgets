const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  firstname: {
    type: String,
    require: [true, "please add the username"],
  },
  lastname: {
    type: String,
    require: [true, "please add the username"],
  },
  email: {
    type: String,
    require: [true, "please add the username"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "please add the password"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  passwordResetToken: {
    type: String,
  },
  tokenExpiry: {
    type: Date,
  },
});

module.exports = mongoose.model("adminInfo", adminSchema);
