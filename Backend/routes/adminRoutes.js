const express = require("express");
const { registerAdmin, login } = require("../controller/adminController");
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", login);

module.exports = router;
