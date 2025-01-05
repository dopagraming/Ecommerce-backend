const { check } = require("express-validator")
const validatorMiddleware = require("../../middlewares/validatorMiddleware")
exports.getCategoryValidator = [
    check("id").isMongoId().withMessage("Invaled category id"), validatorMiddleware
]
exports.createCategoryValidator = [
    check('name').notEmpty().withMessage("Category Require")
        .isLength({ min: 2 }).withMessage("Too Short Category name")
        .isLength({ max: 33 }).withMessage("Too Long Category name"),
    validatorMiddleware
]
exports.updateCategoryValidator = [
    check('id').notEmpty().withMessage("Invalid Category Id Format"),
    validatorMiddleware
]
exports.deleteCategoryValidator = [
    check('id').notEmpty().withMessage("Invalid Category Id Format"),
    validatorMiddleware
]