const { check } = require("express-validator")
const validatorMiddleware = require("../../middlewares/validatorMiddleware")
exports.getBrandValidator = [
    check("id").isMongoId().withMessage("Invaled Brand id"), validatorMiddleware
]
exports.createBrandValidator = [
    check('name').notEmpty().withMessage("Brand Require")
        .isLength({ min: 2 }).withMessage("Too Short Brand name")
        .isLength({ max: 33 }).withMessage("Too Long Brand name"),
    validatorMiddleware
]
exports.updateBrandValidator = [
    check('id').notEmpty().withMessage("Invalid Brand Id Format"),
    validatorMiddleware
]
exports.deleteBrandValidator = [
    check('id').notEmpty().withMessage("Invalid Brand Id Format"),
    validatorMiddleware
]