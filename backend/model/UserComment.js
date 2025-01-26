const mongoose = require('mongoose');
const { User } = require('./User');
const { Post } = require('./Post');

const userCommentSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : User,
    },
    postId : {
        type : mongoose.Types.ObjectId,
        ref : Post,
    },
    comment : {
        type : String
    },
    Likes : {
        type : Number,
        default : 0
    },
    createdAt  :{
        type : Date,
        default : Date.now()
    }
})

const userComment = mongoose.model("userComment" , userCommentSchema);
module.exports = {userComment}