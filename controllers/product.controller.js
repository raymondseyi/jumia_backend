const express = require("express");
const ProductModel = require("../models/product.model");
const addProducts = (req, res) => {
  let form = new ProductModel(req.body)
  form.save()
  .then(()=>{
      console.log("product saved successfully")
  })
  .catch((err)=>{
      console.log(err,"product could not save")
  })
  res.redirect("/admin/addproduct")
};
const fetchProducts = (req,res)=>{
    ProductModel.find()
    .then((products)=>{
        console.log(products)
        res.render("allProducts",{allProducts:products})
    })
}
const displayProductPage = (req,res)=>{
    res.render("addProductPage")
}
module.exports = { addProducts,fetchProducts,displayProductPage };
