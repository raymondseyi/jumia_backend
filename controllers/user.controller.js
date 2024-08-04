const express = require("express");
const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");
const nodemailer = require("nodemailer");
const mailhtml = require("../mail.js")
const jwt = require("jsonwebtoken")
const displayProducts = (req, res) => {
  ProductModel.find()
    .then((products) => {
      // res.render("displayProducts", { allProducts: products });
      res.send({status:true,response:products})
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
      res.send({message:"User Registered Successfully",status:true});

      // encryption and decryption

      // var transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: process.env.GMAIL_USERNAME,
      //     pass: process.env.GMAIL_PASSWORD
      //   }
      // });
      // var mailOptions = {
      //   from: 'seyidami13@gmail.com',
      //   to: ['divineblessing1807@gmail.com','seyidai13@gmail.com'],
      //   subject: 'Welcome to Our Mini Jumia App',
      //   html : mailhtml
      //   // text: 'Hello, you have registered successfully'
      // };
      // transporter.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });
    })
    .catch((err) => {
      console.log("user did not register succesfully",err);
      res.send({message:"User Did not Register Successfully",status:false})
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

const authenticateUser = (req,res)=>{
  console.log(req.body)
  let {password} = req.body
  UserModel.findOne({email:req.body.email})
  .then((user)=>{
    if(user){
      // email is valid
      user.validatePassword(password,(err,same)=>{
        if(!same){
          res.send({status:false,message:"wrong credentials"})
        }else{
          let token = jwt.sign({email:req.body.email},"secret",{expiresIn:"1h"})
          res.send({status:true,message:"right credentials",token})
        }
      })
    }else{
      res.send({status:false,message:"wrong credentials"})
    }
    
  })
  .catch((err)=>{
    console.log(err,"an err occured")
  })
}
const getDashboard = (req,res)=>{
  let token = req.headers.authorization.split(" ")[1]
  jwt.verify(token,"secret",(err,result)=>{
    if(err){
      console.log(err)
      res.send({status:false,message:"token expired or is invalid"})
    }else{
      // console.log(result)
      let email = result.email
      UserModel.findOne({email:email},{firstName:1,lastName:1,phoneNumber:1,_id:0})
      .then((user)=>{
        res.send({status:true,message:"token is valid",user})
      })
      
    }
  })

}
module.exports = {
  displayProducts,
  getUserDetails,
  saveUserDetails,
  addToCart,
  increaseQuantityOfItem,
  decreaseQuantityOfItem,
  authenticateUser,
  getDashboard
};
