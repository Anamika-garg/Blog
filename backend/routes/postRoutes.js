const express = require('express');
const { createPost,getPosts ,getUserPosts ,getCategoryPost,getPostById ,likePost ,unlikePost , commentonPost} = require('../controllers/postControllers');
const router = express.Router();
const {verify} = require('../middleware/verifyToken');
const multer = require('multer');
const { upload,uploadToCloudinary } = require('../middleware/fileUpload');

// const storage = multer.diskStorage({
//     destination : (req,file,cb)=>{
//         return cb(null , './uploads')
//     },
//     filename : (req,file,cb)=>{
//         return cb(null , `${Date.now()}-${file.originalname}`);
//     }
// })

// const upload = multer({storage});

router.post('/create' , verify , upload.single('thumbnail'), uploadToCloudinary, createPost);
router.get('/getPosts' , getPosts);
router.get('/getUserPosts' ,verify, getUserPosts);
router.get('/category/:category' , getCategoryPost);
router.get('/post/:id' , getPostById);
router.get('/like/:id' , verify, likePost);
router.get('/unlike/:id' , verify, unlikePost);
router.post('/comment/:id' , verify, commentonPost);


module.exports = router;