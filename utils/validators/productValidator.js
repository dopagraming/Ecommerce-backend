const { check } = require("express-validator")

const validatorMiddleware = require("../../middlewares/validatorMiddleware")
const categoryModel = require("../../models/categoryModels")
const subcategoryModel = require("../../models/subCategoryModel")
exports.getBrandValidator = [
    check("id").isMongoId().withMessage("Invaled Product id"), validatorMiddleware
]
exports.createBrandValidator = [
    check('title').notEmpty().withMessage("Product Name Require")
        .isLength({ min: 2 }).withMessage("Too short product name").isLength({ max: 100 }).withMessage("Too long product name"),
    check('description').notEmpty().withMessage("Product description Require").isLength({ max: 2000 }).withMessage("Too Long Description"),
    check('quantity').notEmpty().withMessage("Product quantity Require").isNumeric().withMessage("Product Quantity Must Be A Number").isLength({ min: 1 }),
    check("sold").optional().isNumeric().withMessage("Product Sold Must Be A Number"),
    check("price").notEmpty().withMessage("Product Price Require").isLength({ max: 32 }).withMessage("maxLength 15").isNumeric().withMessage("Product Price Must Be A Number"),
    check("priceAfterDiscount").optional().toFloat().isNumeric("Product priceAfterDiscount Must Be A Numbe").custom((value, { req }) => {
        if (req.body.price <= value) {
            throw new Error("priceAfterDiscount Must Be Lower Than Price")
        }
        return true
    }),
    check("colors").optional().isArray().withMessage("Colors Should Be Array Of String"),
    check("images").optional().isArray().withMessage("images Should Be Array Of String"),
    check("imageCover").notEmpty().withMessage("Cove Img Require"),
    check("ratingsAverage").optional().isNumeric().withMessage("Rating Must Be A Number").isLength({ min: 1, max: 5 }).withMessage("Rating Must Be Above Or Equal Between 1.0 and 5.0"),
    check("ratingQuantity").optional().isNumeric().withMessage("ratingQuantity Must Be A Number"),
    check("category").notEmpty().withMessage("This Product Must Be Blong To Category").isMongoId("").withMessage("This Id Is Not Valide").custom(async (value) => {
        const category = await categoryModel.findById(value)
        if (!category) {
            throw new Error("The Category ID Not Valid")
        }
        return true
    }),
    check("subcategories").optional().isArray().withMessage("subcategories Must Be An Array")
        .custom(async (value) => {
            const subcategories = await subcategoryModel.find({ _id: { $exists: true, $in: value } })
            console.log(subcategories)
            if (value.length > 1 || value.length != subcategories.length) {
                throw new Error("Invalid IDs")
            }
        })
        .custom(async (value, { req }) => {
            const subcategories = await subcategoryModel.find({ category: req.body.category })
            const subcategoriesIds = []
            subcategories.forEach((subcategory) => {
                subcategoriesIds.push(subcategory.toString())
            })
            if (!subcategoriesIds.every((id) => value.includes(id))) {
                console.log("good")
            }
        })
    ,
    check("brand").optional().isMongoId().withMessage("brand Id Must Be Valid"),
    validatorMiddleware
]
exports.updateBrandValidator = [
    check('id').notEmpty().withMessage("Invalid Product Id Format"),
    validatorMiddleware
]
exports.deleteBrandValidator = [
    check('id').notEmpty().withMessage("Invalid Product Id Format"),
    validatorMiddleware
]