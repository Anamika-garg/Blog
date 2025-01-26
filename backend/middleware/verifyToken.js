const jwt = require('jsonwebtoken');
const { User } = require('../model/User');

async function verify(req,res,next) {
    try{

        // console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        const userTokenId = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id : userTokenId.id});
        
        if(user){
            req.user = user;
            next();

        }
        else{
            return res.status(400).json({
                error : "Make sure you are logged in"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            "error" : "Login first , Authorization Error"
        })
    }

} 

module.exports = {verify}