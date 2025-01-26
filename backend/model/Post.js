const mongoose = require('mongoose');
const { User } = require('./User');

const postSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true,
    },
    desc:{
        type : String,
        required : true,
    },
    category:{
        type : String,
        required : true,
    },
    thumbnail:{
        type : String,
        required : true,
    },
    authorId:{
        type : mongoose.Types.ObjectId,
        ref : User,
        required : true,
    },
    Likes:{
        type : Number,
        default : 0,
    },
    noOFComments:{
        type : Number,
        default : 0,
    },
    createdAt :{
        type : Date,
        default : Date.now(),
    }

})


const Post = mongoose.model("Post" , postSchema);

module.exports = {Post};