const productSchema = require("../models/products.js");

module.exports.renderIndex = async (req, res) => {
  const products = await productSchema.find({});
  res.render("products/index.ejs", { products });
};

module.exports.createNewProduct = async (req, res) => {
  const link = req.file.path;
  const filename = req.file.filename;
  const newProduct = new productSchema(req.body.product);
  newProduct.owner = req.user._id;
  newProduct.p_img = { link, filename };
  await newProduct.save();
  req.flash("success", "New Product Added");
  res.redirect("/products");
};

module.exports.renderNewForm = (req, res) => {
  res.render("products/new.ejs");
};

module.exports.renderShowPage = async (req, res, next) => {
  const { id } = req.params;
  const product = await productSchema.findById(id).populate("reviews");
  if (!product) {
    req.flash("error", "Product not found");
    res.redirect("/products");
  }
  res.render("products/show.ejs", {
    product,
  });
};

module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productSchema.findById(id);
  if (!product) {
    req.flash("error", "Product not found");
    res.redirect("/products");
  }
  const newProduct = await productSchema.findByIdAndUpdate(
    id,
    req.body.product
  );
  if (typeof req.file != "undefined") {
    const link = req.file.path;
    const filename = req.file.filename;
    newProduct.p_img = { link, filename };
    await newProduct.save();
  }
  req.flash("success", "Product Edited");
  res.redirect(`/products/${id}`);
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productSchema.findById(id);
  if (!product) {
    req.flash("error", "Product not found");
    res.redirect("/products");
  }
  await productSchema.findByIdAndDelete(id);
  req.flash("success", "Deleted");
  res.redirect("/products");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const product = await productSchema.findById(id);
  if (!product) {
    req.flash("error", "Product not found");
    res.redirect("/products");
  }
  let originalImg = product.p_img.link;
  originalImg = originalImg.replace("/upload", "/upload/w_250");
  res.render("products/edit.ejs", { product, originalImg });
};
