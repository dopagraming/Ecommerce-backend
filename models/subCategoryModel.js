const mongoose = require("mongoose")
const subCategorySchma = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: [true, 'SubCategory must be unique'],
    maxlength: [33, 'To long SubCategroy Name'],
    minlength: [2, 'To Short SubCategroy Name']
  },
  slug: {
    type: String,
    lowercase: true
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "subCategroy must be belong parent category"]
  }
}, { timestamps: [true] })


const SubCategoryModel = mongoose.model("SubCategory", subCategorySchma)
module.exports = SubCategoryModel