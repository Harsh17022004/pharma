const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  msg: String,
  rating: Number,
  created_at: {
    type: Date,
    default: new Date(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
