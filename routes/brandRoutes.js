const express = require("express")
const { createBrand, getBrands, deleteBrand, updateBrand, uploadBrandImage } = require("../services/brandService")
const { protect, allowTo } = require("../services/authServices");

const router = express.Router()

router.route("/").post(protect,
    allowTo("admin", "manager"), uploadBrandImage, createBrand).get(getBrands)
router.route("/:id").delete(protect,
    allowTo("admin"), deleteBrand).put(updateBrand)
module.exports = router