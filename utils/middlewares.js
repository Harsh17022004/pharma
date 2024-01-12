const productSchema = require("../models/products.js");
const reviewSchema = require("../models/review.js");
const { schemaProduct } = require("./schema.js");
const ExpressError = require("./ExpressError.js");

module.exports.validateProduct = (req, res, next) => {
  let { error } = schemaProduct.validate(req.body);
  if (error) {
    const errDets = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errDets);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = schemaReview.validate(req.body);
  if (error) {
    const errDets = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errDets);
  } else {
    next();
  }
};

module.exports.isloggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // save url
    req.session.currUrl = req.originalUrl;
    req.flash("error", "You are't logged In");
    return res.redirect("/login");
  }
  next();
};

// we can not access the save url with req.session because passport reset the session object after login
module.exports.saveUrl = (req, res, next) => {
  if (req.session.currUrl) {
    res.locals.currUrl = req.session.currUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const product = await productSchema.findById(id);
  if (!product.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to access");
    return res.redirect(`/products/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await reviewSchema.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to access");
    return res.redirect(`/products/${id}`);
  }
  next();
};
