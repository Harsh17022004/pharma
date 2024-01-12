const reviewSchema = require("../models/review.js");
const productSchema = require("../models/products.js");

module.exports.createReview = async (req, res) => {
  const product = await productSchema.findById(req.params.id);
  const newReview = new reviewSchema(req.body.review);
  newReview.author = req.user._id;
  product.reviews.push(newReview);
  await newReview.save();
  await product.save();
  res.redirect(`/products/${req.params.id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await reviewSchema.findByIdAndDelete(reviewId);
  await productSchema.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  res.redirect(`/products/${id}`);
};
