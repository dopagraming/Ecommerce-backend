const mongoose = require("mongoose")

const couponSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Coupon name required"],
        trim: true,
        unique: true
    },
    expire: {
        type: Date,
        required: [true, "Coupon expire time required"],
    },
    discount: {
        type: Number,
        required: [true, "Coupon discount value required"]
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Coupon", couponSchema)