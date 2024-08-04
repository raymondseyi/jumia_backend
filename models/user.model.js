const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const UserSchema = mongoose.Schema({
    firstName : {type:String,required:true},
    lastName : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    password:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    registrationDate:{type:String,default:Date.now()},   
    cart: [
        {
          _id: { type: String, required: true },
          product_name: { type: String, required: true },
          product_price: { type: Number, required: true },
          product_quantity: { type: Number, required: true },
          product_image: { type: String, required: true },
          quantity_chosen :{type:Number,required:true,default:1}
        },
      ], 
})
let saltRound = 10
UserSchema.pre("save", function(next){
    bcrypt.hash(this.password,saltRound,(err,hashedPassword)=>{
        if(err){
            console.log(err,"password could not be hashed")
        }else{
            this.password = hashedPassword
            next()
        }
    })
})

UserSchema.methods.validatePassword = function(password,callback){
    bcrypt.compare(password,this.password,(err,same)=>{
        if(!err){
            callback(err,same)
        }else{
            next()
        }
        
    })
}
const userModel = mongoose.model("user_collection",UserSchema)



module.exports = userModel
