const express = require("express")
const router = express.Router()
const {displayProducts, getUserDetails, saveUserDetails,addToCart, increaseQuantityOfItem} = require("../controllers/user.controller")
router.get("/",displayProducts)
router.get("/signup",getUserDetails)
router.post("/saveuserdetails",saveUserDetails)
router.post("/addtocart",addToCart)
router.post("/increaseproductquantity",increaseQuantityOfItem)
module.exports = router