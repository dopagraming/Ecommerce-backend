const express = require("express");
const { createSubCategory, getSubCategory, updateSubCategory, deleteSubCategory, getSubCategories, setSubCategoryIdToBody, createFilterObj } = require("../services/subCategoryService");
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require("../utils/validators/subCategoryValidators");
const { protect, allowTo } = require("../services/authServices");

// mergeParams : Allow us to access parameters on another routers
const router = express.Router({ mergeParams: true })
router.route("/")
    .post(protect,
        allowTo("admin", "manager"), setSubCategoryIdToBody, createSubCategoryValidator, createSubCategory)
    .get(createFilterObj, getSubCategories)
router.route("/:id")
    .get(getSubCategoryValidator, getSubCategory)
    .put(protect,
        allowTo("admin", "manager"), updateSubCategoryValidator, updateSubCategory)
    .delete(protect,
        allowTo("admin"), deleteSubCategoryValidator, deleteSubCategory)
module.exports = router