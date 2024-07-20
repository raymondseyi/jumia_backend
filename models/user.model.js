const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    password:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    registrationDate:{type:String,default:Date.now()},   
})
const userModel = mongoose.model("user_collection",UserSchema)
module.exports = userModel
// cart: [
//   {
//     _id: { type: String, required: true },
//     product_name: { type: String, required: true },
//     product_price: { type: Number, required: true },
//     product_quantity: { type: Number, required: true },
//     product_image: { type: String, required: true },
//     quantity_chosen :{type:Number,required:true,default:1}
//   },
// ], 