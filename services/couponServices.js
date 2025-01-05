
const CouponModel = require("../models/couponModel")
const { deleteOne, updateOne, getOne, getGroup, createOne } = require("./handlebarsFactory");
// @desc Get All coupons
// @ route Get /api/v1/coupons
// @access Public

exports.getCoupons = getGroup(CouponModel)

// @desc Get Specific coupon
// @ route Get /api/v1/coupons/:id
// @access Public/user-admin-manager

exports.getCoupon = getOne(CouponModel)

// @desc Create coupon
// @ route POST /api/v1/coupons
// @access Private/Protect/User

exports.createCoupons = createOne(CouponModel)

// @desc Update Specific coupon
// @ route Put /api/v1/coupons/:id
// @access Private/Protect/User

exports.updateCoupon = updateOne(CouponModel)

// @desc Delete Specific coupon
// @ route Delete /api/v1/coupons/:id
// @access Private/Protect/User-Admin-Manager

exports.deleteCoupon = deleteOne(CouponModel)