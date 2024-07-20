const express = require("express")
const router = express.Router();
const ProductModel = require("../models/product.model")
const {addProducts, fetchProducts, displayProductPage} = require("../controllers/product.controller")
router.get("/addproduct",displayProductPage)
router.get("/allproducts",fetchProducts)
router.post("/products",addProducts)
module.exports = router