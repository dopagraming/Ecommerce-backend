const BrandModel = require("../models/brandModels");
const { deleteOne, updateOne, getGroup, createOne } = require("./handlebarsFactory");
const { uploadSingleImage } = require("../middlewares/uploadIamgeMeddlware")
// @desc Create Brand
// @ route api/v1/brands
// @ Private
exports.createBrand = createOne(BrandModel)

exports.uploadBrandImage = uploadSingleImage("image", "brands")
// @desc Get All Brands
// @route api/v1/brands
// Public

exports.getBrands = getGroup(BrandModel)


// @desc Update Specific Brand
// @ route Get /api/v1/brands/:id
// @access Private

exports.updateBrand = updateOne(BrandModel)

// @desc Delete Specific brand
// @ route Get /api/v1/brands/:id
// @access Private

exports.deleteBrand = deleteOne(BrandModel)