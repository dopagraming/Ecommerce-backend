const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    cartItems: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product"
            },
            quantity: Number,
            color: String,
            price: Number
        }
    ],
    totalCartPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
}, { timestamps: true })
module.exports = mongoose.model("Cart", cartSchema)