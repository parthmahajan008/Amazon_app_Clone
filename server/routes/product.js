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

//rate the product

productRouter.post("/admin/rate-product", auth, async (req, res) => {
  try {
    const { id, rating } = req.body;
    let product = await Product.findById(id);

    for (let i = 0; i < product.ratings.length; i++) {
      if (product.ratings[i].userId == req.user) {
        product.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user,
      rating,
    };
    product.ratings.push(ratingSchema);
    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.get("/api/deal-of-day", auth, async (req, res) => {
  try {
    let products = await Product.find({}); //getting all the products
    products = products.sort((a, b) => {
      let aSum = 0;
      let bSum = 0;

      for (let i = 0; i < a.ratings.length; i++) {
        aSum += a.ratings[i].rating;
      }
      for (let i = 0; i < b.ratings.length; i++) {
        bSum += b.ratings[i].rating;
      }
      return aSum < bSum ? 1 : -1; //b takes precedence over a
    });
    res.json(products[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = productRouter;
