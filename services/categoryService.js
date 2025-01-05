
const CategoryModel = require("../models/categoryModels");
const { deleteOne, updateOne, getOne, getGroup, createOne } = require("./handlebarsFactory");
const apiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/uploadIamgeMeddlware");
// @desc Get Category
// @ route Get /api/v1/categorise
// @access Puvlic

exports.getCategorise = getGroup(CategoryModel)

exports.uploadCategoryImage = uploadSingleImage("image", "categories")
// @desc Get Specific Category
// @ route Get /api/v1/categorise/:id
// @access Puvlic

exports.getCategory = getOne(CategoryModel)
// @desc Create Category
// @ route POST /api/v1/categorise
// @access Private

exports.createCategory = createOne(CategoryModel)
// @desc Update Specific Category
// @ route Get /api/v1/categorise/:id
// @access Private

exports.updateCategory = updateOne(CategoryModel)

// @desc Update Specific Category
// @ route Get /api/v1/categorise/:id
// @access Private

exports.deleteCategory = deleteOne(CategoryModel)