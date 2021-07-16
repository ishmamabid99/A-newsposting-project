const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    catagory:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    news:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    }
});
const Post = mongoose.model('posts',postSchema);

module.exports = Post;