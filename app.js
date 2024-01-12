if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const productRouter = require("./router/product.js");
const reviewRouter = require("./router/review.js");
const userRouter = require("./router/user.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(cookieParser("secretCode"));

app.engine("ejs", engine);

mongoUrl = process.env.ATLAS_LINK;

main();
async function main() {
  mongoose.connect(mongoUrl);
}
const store = MongoStore.create({
  mongoUrl: mongoUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("Error occured in mongo session store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() * 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// locals middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/", (req, res) => {
  res.redirect("/products");
});
app.use("/products", productRouter);
app.use("/products/:id/review", reviewRouter);
app.use("/", userRouter);

app.all("*", (req, res) => {
  throw new ExpressError(404, "Page not found");
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("products/error.ejs", { err });
});

app.listen("3000", () => {
  console.log("App is listening");
});
