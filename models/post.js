const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const PostSchema = new Schema({
    title:{type:String , required : true},
    body:{type:String , required : true},
    image:{type : String , required : true},
    user:{type:String}
},{collection :"Posts" })

const Post = mongoose.model('Post' , PostSchema)

module.exports = Post;
