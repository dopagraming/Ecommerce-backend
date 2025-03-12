const SubCategoryModel = require("../models/subCategoryModel");
const { deleteOne, updateOne, getOne, getGroup, createOne } = require("./handlebarsFactory");
// @desc Get Category
// @ route Get /api/v1/categorise
// @access Puvlic

exports.getSubCategories = getGroup(SubCategoryModel, "category")

// @desc Create subCategory
// @ route POST /api/v1/subCategorise
// @access Private

exports.createSubCategory = createOne(SubCategoryModel, 'subcategory')

// @desc Get Specific Category
// @ route Get /api/v1/subCategorise/:id
// @access Puvlic

exports.getSubCategory = getOne(SubCategoryModel)

// @desc Update Sepcific SubCategory
// @route Put /api/v1/subCategory/:id
// @access Private

exports.updateSubCategory = updateOne(SubCategoryModel)

// @desc Delete SubCategory
// route Delete api/v1/subCategroy/:id
// access Private

exports.deleteSubCategory = deleteOne(SubCategoryModel)

// Nested Route
// Post /api/v1/categorise/:categoryId/subcategories

exports.setSubCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId
  }
  next()
}

// Nested Route
// Get /api/v1/categorise/:categoryId/subcategories

exports.createFilterObj = (req, res, next) => {
  let filterObj = {}
  console.log(req.params)
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj
  next()
}