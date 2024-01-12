const mongoose = require("mongoose");

main();
async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/pharma");
}
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
