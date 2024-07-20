const mongoose = require("mongoose");
// Product Schema
let ProductSchema = mongoose.Schema({
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  product_quantity: { type: Number, required: true },
  product_image: { type: String, required: true },
  product_date: { type: String, default: Date.now() },
  
});
// Product Model
let ProductModel = mongoose.model("products_collection", ProductSchema);
module.exports = ProductModel;
