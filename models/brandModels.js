const mongoose = require("mongoose");
const bardSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Barnd Must Be Require"],
        unique: [true, "Barnd Must Be Unique "],
        minlength: [2, "Too Short Barnd's Name"],
        maxlength: [33, "Too Long Barnd's Name"]
    }, slug: {
        type: String,
        lowercase: true
    },
    // subcategory: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "subcategory",
    //     required: [true, "brand must be belong parent Subcategory"]
    // },
    image: String,
}, { timestamps: true })
const setImageUrl = (doc) => {
    if (doc.image) {
        const imageUrl = `${process.env.BASI_URL}/categories/${doc.image}`
        doc.image = imageUrl
    }
}
bardSchema.post('init', function (doc) {
    setImageUrl(doc)
});

bardSchema.post('save', function (doc) {
    setImageUrl(doc)
});
const BrandModel = mongoose.model("Brand", bardSchema)
module.exports = BrandModel