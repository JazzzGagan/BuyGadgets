const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminInfo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerAdmin = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    res.status(400);
    throw new Error("All the fields are mandatory");
  }

  const adminAvailable = await Admin.findOne({ email });
  if (adminAvailable) {
    res.status(400);
    throw new Error("Admin already Exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("hashPassword", password);

  const admin = await Admin.create({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });
  console.log(`Admin created, ${admin}`);

  if (admin) {
    res.status(201).json({
      id: admin.id,
      firstname: admin.firstname,
      lastname: admin.lastname,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("Admin data is not valid");
  }

  res.json("Register the admin");
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All the fields are mandatory");
  }

  const admin = await Admin.findOne({ email });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    const accessToken = jwt.sign(
      {
        admin: {
          firstname: admin.firstname,
          lastname: admin.lastname,
          email: admin.email,
          id: admin.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRECT,
      { expiresIn: "30d" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("Email or Password is not valid");
  }
});

module.exports = { registerAdmin, login };
