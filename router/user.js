const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveUrl } = require("../utils/middlewares.js");
const userController = require("../controller/user.js");

router
  .route("/signup")
  .get(userController.signupPage)
  .post(wrapAsync(userController.signUpUser));

router
  .route("/login")
  .get(userController.loginpage)
  .post(
    saveUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.loginUser)
  );

router.get("/logout", wrapAsync(userController.logoutUser));

module.exports = router;
