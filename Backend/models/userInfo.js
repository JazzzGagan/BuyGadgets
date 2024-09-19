const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      require: [true, "Please add the first name"],
    },
    lastname: {
      type: String,
      require: [true, "Please add the last name"],
    },
    email: {
      type: String,
      require: [true, "Please add the email address"],
      unique: [true, "email is already taken"],
    },
    password: {
      type: String,
      require: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserInfos", userSchema);
