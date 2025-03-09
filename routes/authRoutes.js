const express = require("express")
const { signup, login, forgetPassword, verifyPassResetCode, allowTo } = require("../services/authServices")
const { signupValidator, loginValidator } = require("../utils/validators/authValidator")

const router = express.Router()


router.route("/signup").post(signupValidator, signup)
router.route("/login").post(loginValidator, login)
router.route("/forgetPassword").post(forgetPassword)
router.route("/verifyPassResetCode").post(verifyPassResetCode)
module.exports = router