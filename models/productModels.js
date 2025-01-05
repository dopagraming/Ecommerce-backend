const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: [2, "Product Name Too Short"],
        maxlength: [100, 'Product Name Too Long'],
        required: [true, "You must Write Product Name"],
        trim: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "You have to write Desc"],
        maxlength: [2000, "Too Short Description"],
    },
    quantity: {
        type: Number,
        required: [true, "Product Quantity Is Required"]
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        min: [1, "maxLength 1"],
        max: [20000, "maxLength 20000"],
        required: [true, "Product Price Is Required"],
        trim: true
    },
    priceAfterDiscount: {
        type: Number,
    },
    colors: [String],
    images: [String],
    imageCover: {
        type: String,
        required: true
    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating Must Be Above Or Equal 1.0'],
        max: [5, "Rating Must Be Below Or Equal 5.0"]
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, 'Product Must Be Belong To Category']
    },
    subcategories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "SubCategory"
        }
    ],
    brands: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Brand"
        }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

productSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product'
});

module.exports = mongoose.model('Product', productSchema)