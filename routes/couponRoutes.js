const express = require("express")
const { protect, allowTo } = require("../services/authServices")
const { getCoupons, createCoupons, getCoupon, deleteCoupons, deleteCoupon, updateCoupons, updateCoupon } = require("../services/couponServices")

const router = express.Router()

router.route("/").get(protect, allowTo("admin", "manager"), getCoupons)
    .post(protect, allowTo("admin", "manager"), createCoupons)
router.route("/:id").get(protect, allowTo("admin", "manager"), getCoupon)
    .delete(protect, allowTo("admin", "manager"), deleteCoupon)
    .put(protect, allowTo("admin", "manager"), updateCoupon)

module.exports = router