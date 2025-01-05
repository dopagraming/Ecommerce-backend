const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Category Require"],
      unique: [true, "Category Must Be Unique"],
      minlength: [2, "Too Short Category name"],
      Maxlength: [33, "Too Long Category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);


const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASI_URL}/categories/${doc.image}`
    doc.image = imageUrl
  }
}
categorySchema.post('init', function (doc) {
  setImageUrl(doc)
});

categorySchema.post('save', function (doc) {
  setImageUrl(doc)
});

// Create Model
const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;
