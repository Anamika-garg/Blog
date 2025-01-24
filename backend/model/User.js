const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required :true
    },
    Liked : {
        type : Number,
        default : 0,
    },
    Avatar : {
        type : String,
        required : true
    },
    NoOfPosts : {
        type : Number,
        default : 0,
    }
})




const User = mongoose.model("User" , userSchema);
module.exports = {User};