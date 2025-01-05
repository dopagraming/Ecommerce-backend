const { protect, allowTo } = require("../services/authServices")
const express = require("express")
const { getWishlist, addToWishlist, deleteFromWishlist } = require("../services/wishListServices")
const rotuer = express.Router()

rotuer.use(protect, allowTo("user"))
rotuer.route("/").get(getWishlist).post(addToWishlist)
rotuer.route("/:productId").delete(deleteFromWishlist)




module.exports = rotuer


