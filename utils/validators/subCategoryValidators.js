const { check } = require("express-validator")
const validatorMiddleware = require("../../middlewares/validatorMiddleware")
exports.getSubCategoryValidator = [
    check("id").isMongoId().withMessage("Invaled SubCategory id"), validatorMiddleware
]

exports.createSubCategoryValidator = [
    check('name').notEmpty().withMessage("SubCategory Require")
        .isLength({ min: 2 }).withMessage("Too Short SubCategory name")
        .isLength({ max: 33 }).withMessage("Too Long SubCategory name"),
    check("category").notEmpty().withMessage("Category Require").isMongoId().withMessage("Invalid Category Id Format"),
    validatorMiddleware
]

exports.updateSubCategoryValidator = [
    check('id').notEmpty().withMessage("Invalid SubCategory Id Format"),
    validatorMiddleware
]
exports.deleteSubCategoryValidator = [
    check('id').notEmpty().withMessage("Invalid SubCategory Id Format"),
    validatorMiddleware
]