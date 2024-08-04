const express = require("express");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin.route")
const userRouter = require("./routes/user.route")
require("dotenv").config()
const cors = require("cors")
const app = express();
const PORT = 5000
app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/admin",adminRouter)
app.use("/user",userRouter)
app.set("view engine","ejs")
let URI = process.env.MONGO_DB_URI
mongoose.connect(URI)
.then(()=>{
    console.log("mongodb iyaf connect")
})
.catch((err)=>{
    console.log(err, "mongodb no gree connect")
})
// bodyparser
app.listen(PORT,(err)=>{
    if(err){
        console.log("server could not start")
    }else{
        console.log("server ti start ooo")
    }
})

// Deploy our backend application.
// Authentication and Authorization.