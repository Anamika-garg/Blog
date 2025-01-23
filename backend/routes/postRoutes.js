const express = require('express');
const { createPost,getPosts ,getUserPosts ,getCategoryPost,getPostById ,likePost ,unlikePost , commentonPost} = require('../controllers/postControllers');
const router = express.Router();
const {verify} = require('../auth/verifyToken')

router.post('/create' , verify , createPost);
router.get('/getPosts' , getPosts);
router.get('/getUserPosts' ,verify, getUserPosts);
router.get('/category/:category' , getCategoryPost);
router.get('/:id' , getPostById);
router.get('/like/:id' , verify, likePost);
router.get('/unlike/:id' , verify, unlikePost);
router.post('/comment/:id' , verify, commentonPost);


module.exports = router;