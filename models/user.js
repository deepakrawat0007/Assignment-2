const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const UserSchema = new Schema({
    name:{type:String , required : true},
    email:{type : String , unique :true},
    password:{type : String , required :true}
},{collection:"Users"})

const User = mongoose.model("User" , UserSchema)

module.exports = User;