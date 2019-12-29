const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//Defining user Schema
const userSchema = new Schema({
    username:String,
    googleId:String,
    thumbnail:String
});
//Intializing user Model
const User = mongoose.model("user-profile",userSchema,"Users");

module.exports=User;