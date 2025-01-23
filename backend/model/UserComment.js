const mongoose = require('mongoose');

const userCommentSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId
    },
    postId : {
        type : mongoose.Types.ObjectId
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