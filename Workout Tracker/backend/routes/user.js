const express = require("express");
const { loginUser, signupUser } = require("../controller/userControler");
const router = express.Router();

//login
router.post("/login", loginUser);
//signe up
router.post("/signup", signupUser);

module.exports = router;
