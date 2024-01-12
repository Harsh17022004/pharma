const User = require("../models/user.js");

module.exports.signupPage = (req, res) => {
  res.render("user/signup.ejs");
};

module.exports.signUpUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body.User;
    const newUser = new User({ username, email });
    const registredUser = await User.register(newUser, password);
    // console.log(registredUser);
    req.login(registredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Pharma care");
      res.redirect("/products");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginpage = (req, res) => {
  res.render("user/login.ejs");
};

module.exports.loginUser = async (req, res, next) => {
  req.flash("success", "Welcome Back");
  res.redirect(res.locals.currUrl || "/products");
};

module.exports.logoutUser = async (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logout Successfully");
    res.redirect("/products");
  });
};
