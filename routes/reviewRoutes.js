const express = require("express");
const {
    getReviews,
    createReview,
    getReview,
    updateReview,
    deleteReview,
    createFilterObj,
    setProductIdToBody,
} = require("../services/reviewService");
const { protect, allowTo } = require("../services/authServices");
const { createReviewValidator, getReviewValidator, updateReviewValidator, deleteReviewValidator } = require("../utils/validators/reviewValidator");
const router = express.Router({ mergeParams: true })
router.route("/").get(createFilterObj, getReviews).post(
    protect,
    allowTo("user"),
    setProductIdToBody,
    createReviewValidator
    , createReview);
router
    .route("/:id")
    .get(getReviewValidator, getReview)
    .put(protect,
        allowTo("user"), updateReviewValidator, updateReview)
    .delete(protect,
        allowTo("admin", "manager", "user"), deleteReviewValidator, deleteReview);

module.exports = router;