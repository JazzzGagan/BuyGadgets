const asyncHandler = require("express-async-handler");
const User = require("../models/userInfo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@des Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    res.status(400);
    throw new Error("All the fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already register");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("hashpassword: ", hashPassword);

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });
  console.log(`user created: ${user}`);

  if (user) {
    res.status(201).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register the user" });
});

//@des login a user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRECT,
      { expiresIn: "30m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("email or password is not valid");
  }
});

//@des  current user info
//@route POST /api/users/current
//@access public
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
