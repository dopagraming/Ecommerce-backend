const express = require("express");
const { createProduct, getProduct, updateProduct, deleteProduct, getAllProducts } = require("../services/productService");
const { createBrandValidator, getBrandValidator, updateBrandValidator, deleteBrandValidator } = require("../utils/validators/productValidator");
const { protect, allowTo } = require("../services/authServices");
const reviewRoutes = require("./reviewRoutes")
const router = express.Router()

router.use("/:productId/reviews", reviewRoutes)

router.route("/").get(getAllProducts).post(protect,
    allowTo("admin", "manager"), createBrandValidator, createProduct)
router.route("/:id")
    .get(getBrandValidator, getProduct)
    .put(protect,
        allowTo("admin", "manager"), updateBrandValidator, updateProduct)
    .delete(protect,
        allowTo("admin"), deleteBrandValidator, deleteProduct)

module.exports = router