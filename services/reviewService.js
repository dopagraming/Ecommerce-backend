
const ReviewModel = require("../models/reviewModel");
const { deleteOne, updateOne, getOne, getGroup, createOne } = require("./handlebarsFactory");
// @desc Get All Reviews
// @ route Get /api/v1/reviews
// @access Public

exports.getReviews = getGroup(ReviewModel)

// @desc Get Specific Review
// @ route Get /api/v1/reviews/:id
// @access Public/user-admin-manager

exports.getReview = getOne(ReviewModel)

// @desc Create Review
// @ route POST /api/v1/reviews
// @access Private/Protect/User

exports.createReview = createOne(ReviewModel)

// @desc Update Specific Review
// @ route Put /api/v1/reviews/:id
// @access Private/Protect/User

exports.updateReview = updateOne(ReviewModel)

// @desc Delete Specific Review
// @ route Delete /api/v1/reviews/:id
// @access Private/Protect/User-Admin-Manager

exports.deleteReview = deleteOne(ReviewModel)


// Nested Route
// Post /api/v1/products/:productId/reviews

exports.setProductIdToBody = (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.productId
    if (!req.body.user) req.body.user = req.user._id
    next()
}

// Nested Route
// Get /api/v1/product/:productId/reviews

exports.createFilterObj = (req, res, next) => {
    let filterObj = {}
    console.log(req.params)
    if (req.params.productId) filterObj = { product: req.params.productId };
    req.filterObj = filterObj
    next()
}