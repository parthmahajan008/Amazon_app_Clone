//to fetch all products of certain category
const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");
const auth = require("../middlewares/auth");

// /api/products?category=Essentials       //req.query.category  //using this here
// /api/products:category:Essentials       //req.params.category
productRouter.get("/api/get-products", auth, async (req, res) => {
  try {
    const products = await Product.find({ category: req.query.category });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//search results
// /api/products/search/:iphone  // req.params.iphone
// /api/products/search/:hello  // req.params.hello
// /api/products/search/:great  // req.params.great
productRouter.get("/api/products/search/:name", auth, async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = productRouter;
