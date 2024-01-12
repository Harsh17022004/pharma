const mongoose = require("mongoose");
const reviewSchema = require("./review.js");

const productSchema = new mongoose.Schema({
  p_name: String,
  p_desc: String,
  p_qyt: String,
  mrp: Number,
  p_exp: Date,
  created_at: {
    type: Date,
    default: new Date(),
  },
  p_img: {
    link: String,
    filename: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

productSchema.post("findOneAndDelete", async (product) => {
  if (product) {
    await reviewSchema.deleteMany({ _id: { $in: product.reviews } });
  }
});

module.exports = mongoose.model("Product", productSchema);
