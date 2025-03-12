const multer = require("multer")
const ProductModel = require("../models/productModels");
const { deleteOne, updateOne, getOne, getGroup, createOne } = require("./handlebarsFactory");
// @desc Get List Of Products
// @ route Get /api/v1/products
// @access Public
exports.getAllProducts = getGroup(ProductModel, "category")


// @desc Get Specific Product
// @ route Get /api/v1/products/:id
// @access Puvlic

exports.getProduct = getOne(ProductModel, "reviews")

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log(req.body)
        cb(null, filename)
    }
})
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new apiError("You Can Uplaode Just Images"), false)
    }
}
const upload = multer({ storage: multerStorage, fileFilter: multerFilter })
exports.uploadImagesForProduct = upload.fields[{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 4 }]
// @desc Create Product
// @ route POST /api/v1/products
// @access Private

exports.createProduct = createOne(ProductModel)
// @desc Updated Specific Product
// @ route Updated /api/v1/products/:id
// @access Private

exports.updateProduct = updateOne(ProductModel, "product", "title")

// @desc Update Specific Product
// @ route Get /api/v1/products/:id
// @access Private

exports.deleteProduct = deleteOne(ProductModel)





