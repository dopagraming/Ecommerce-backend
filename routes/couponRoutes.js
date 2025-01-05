const express = require("express")
const { protect, allowTo } = require("../services/authServices")
const { getCoupons, createCoupons, getCoupon, deleteCoupons, deleteCoupon, updateCoupons, updateCoupon } = require("../services/couponServices")

const router = express.Router()

router.route("/").get(protect, allowTo("admin", "manage"), getCoupons)
    .post(protect, allowTo("admin", "manage"), createCoupons)
router.route("/:id").get(protect, allowTo("admin", "manage"), getCoupon)
    .delete(protect, allowTo("admin", "manage"), deleteCoupon)
    .put(protect, allowTo("admin", "manager"), updateCoupon)

module.exports = router