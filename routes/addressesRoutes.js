const express = require("express")
const { protect, allowTo } = require("../services/authServices")
const { getAllAddresses, addAddress, deleteAddress } = require("../services/addressesServices")

const router = express.Router()

router.use(protect, allowTo("user"))

router.route("/").get(getAllAddresses).post(addAddress)
router.route("/:addressId").delete(deleteAddress)

module.exports = router