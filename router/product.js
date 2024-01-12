const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const productContoller = require("../controller/product.js");
const {
  isloggedIn,
  isOwner,
  validateProduct,
} = require("../utils/middlewares.js");
const multer = require("multer");
const { storage } = require("../utils/cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(productContoller.renderIndex))
  .post(
    isloggedIn,
    upload.single("product[p_img]"),
    validateProduct,
    wrapAsync(productContoller.createNewProduct)
  );
// new route
router.get("/new", isloggedIn, productContoller.renderNewForm);
router
  .route("/:id")
  .get(wrapAsync(productContoller.renderShowPage))
  .patch(
    isloggedIn,
    isOwner,
    upload.single("product[p_img]"),
    validateProduct,
    wrapAsync(productContoller.updateProduct)
  )
  .delete(isloggedIn, isOwner, wrapAsync(productContoller.deleteProduct));

// edit route
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(productContoller.renderEditForm)
);
module.exports = router;
