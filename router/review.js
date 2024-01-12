const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isReviewAuthor, validateReview } = require("../utils/middlewares.js");
const reviewController = require("../controller/review.js");
// Review
router.post("/", validateReview, wrapAsync(reviewController.createReview));
router.delete(
  "/:reviewId",
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
