const express = require("express");
const { login, register, checkEmailExists } = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/checkemail",checkEmailExists);

module.exports = router;
