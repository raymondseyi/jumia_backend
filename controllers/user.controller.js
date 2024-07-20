const express = require("express");
const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");
const displayProducts = (req, res) => {
  ProductModel.find()
    .then((products) => {
      res.render("displayProducts", { allProducts: products });
    })
    .catch((err) => {
      console.log(err, "an error occured");
    });
};
const getUserDetails = (req, res) => {
  res.render("getUserDetails");
};
const saveUserDetails = (req, res) => {
  console.log(req.body);
  let form = UserModel(req.body);
  form
    .save()
    .then(() => {
      console.log("User Registered Successfully");
    })
    .catch((err) => {
      console.log("user did not register succesfully");
    });
};
const addToCart = (req, res) => {
  let cartItem = req.body;
  console.log(cartItem);
  UserModel.updateOne(
    { _id: "6697e4e2f4b441941e342c88" },
    { $push: { cart: cartItem } }
  )
    .then(() => {
      res.send("it works");
    })
    .catch((err) => {
      console.log(err, "error occured");
    });
};
const increaseQuantityOfItem = () => {
  UserModel.updateOne(
    { _id: "6697e4e2f4b441941e342c88", "cart._id": "66893b76fab794d1c55ae8a9" },
    { $inc: { "cart.$.quantity_chosen": 1 } }
  )
    .then(() => {
      console.log("incremented");
    })
    .catch((err) => {
      console.log(err, "an error occured");
    });
};
const decreaseQuantityOfItem = () => {
  UserModel.updateOne(
    { _id: "6697e4e2f4b441941e342c88", "cart._id": "66893b76fab794d1c55ae8a9" },
    { $inc: { "cart.$.quantity_chosen": -1 } }
  )
    .then(() => {
      console.log("incremented");
    })
    .catch((err) => {
      console.log(err, "an error occured");
    });
};
module.exports = {
  displayProducts,
  getUserDetails,
  saveUserDetails,
  addToCart,
  increaseQuantityOfItem,
  decreaseQuantityOfItem,
};
