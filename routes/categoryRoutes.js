const express = require("express");
const { param, validationResult } = require("express-validator")
const multer = require("multer")
const { getCategoryValidator, updateCateoryValidator, deleteCateoryValidator, deleteCategoryValidator, updateCategoryValidator } = require("../utils/validators/categoryValidators")
const {
  getCategorise,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
} = require("../services/categoryService");
const { createCategoryValidator } = require("../utils/validators/categoryValidators");
const subCategorRouter = require("./subCategoryRoutes");
const { protect, allowTo } = require("../services/authServices");
const router = express.Router();
router.use("/:categoryId/subCategories", subCategorRouter)
router.route("/").get(getCategorise).post(
  protect,
  allowTo("admin", "manager")
  , uploadCategoryImage
  , createCategoryValidator
  , createCategory);
router
  .route("/:id")
  .get(getCategoryValidator,
    getCategory)
  .put(protect,
    allowTo("admin", "manager"), updateCategoryValidator, updateCategory)
  .delete(protect,
    allowTo("admin"), deleteCategoryValidator, deleteCategory);

module.exports = router;