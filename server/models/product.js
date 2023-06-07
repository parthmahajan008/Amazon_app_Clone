const mongoose = require("mongoose");
const ratingSchema = require("./rating");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, //removes the extra spaces
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [{ type: String, required: true }],
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    required: true,
    type: Number,
  },
  category: {
    type: String,
    require: true,
  },
  ratings: [ratingSchema],
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productSchema };
