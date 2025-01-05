const mongoose = require("mongoose");
const ProductModel = require("./productModels")
const reviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        rating: {
            type: Number,
            min: [1, "Min rating value 1.0"],
            max: [5, "Max rating value 5.0"],
            required: [true, "You must write the rating"],
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Review must belong to user"],
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: [true, "Review must belong to product"],
        },
    },
    { timestamps: true }
);


reviewSchema.pre(/^find/, function (next) {
    this.populate({ path: 'user', select: 'name' });
    next();
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
    productId
) {
    const result = await this.aggregate([
        // Stage 1 : get all reviews in specific product
        {
            $match: { product: productId },
        },
        // Stage 2: Grouping reviews based on productID and calc avgRatings, ratingsQuantity
        {
            $group: {
                _id: 'product',
                avgRatings: { $avg: '$ratings' },
                ratingsQuantity: { $sum: 1 },
            },
        },
    ]);

    // console.log(result);
    if (result.length > 0) {
        await ProductModel.findByIdAndUpdate(productId, {
            ratingsAverage: result[0].avgRatings,
            ratingsQuantity: result[0].ratingsQuantity,
        });
    } else {
        await ProductModel.findByIdAndUpdate(productId, {
            ratingsAverage: 0,
            ratingsQuantity: 0,
        });
    }
};

reviewSchema.post('save', async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

reviewSchema.post('remove', async function () {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
});


// Check if the model exists before defining it
const ReviewModel = mongoose.models.Review || mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
