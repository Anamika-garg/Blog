//  Create Post
//  /api/post/create

const {Post} = require('../model/Post');
const { User } = require('../model/User');
const { userComment } = require('../model/UserComment');

async function createPost(req, res, next) {
  try {
    const { title, desc, category } = req.body;
    console.log( title, desc, category )

    console.log(req.file);
    if (!title || !desc || !category) {
      return res.status(422).json({
        error: "Fill all the details",
      });
    }

    const user = req.user;
    console.log(req.file.cloudinaryUrl)
    const newPost = new Post({
        title,
        desc,
        category,
        authorId : user.id,
        thumbnail : req.file.cloudinaryUrl
    })
    await newPost.save();

    await User.updateOne(
        { _id: user.id }, 
        { $inc: { NoOfPosts: 1 } } 
      );

    return res.status(201).json({
        success : "Post created Successfully",
        Post : newPost
    })
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "some error occured",
      err,
    });
  }
}


// get Posts
// /api/post/getPosts

async function getPosts(req,res,next) {
    try{
      const Posts = await Post.find();
      
      return res.status(200).json({
        success : "Posts fetched Successfully",
        Posts
      })
    }
    catch(err){
      console.log(err);
      res.status(400).json({
        "error" : "Unable to fetch the Post, try again",
        err
      })
    }
  }
  
  //get User Posts
  // /api/post/getUserPosts
  
  async function getUserPosts(req,res,next) {
    try{
      const user = req.user;
      const Posts = await Post.find({authorId : user.id});
      if(Posts.length != 0){
        return res.status(200).json({
          "success" : "Your Posts fetched successfully",
          ProgressEvent
        })
      }
      
      return res.status(404).json({
        "error" : "No Posts found",
      })
    }catch(err){
      cosole4.log(err)
      return res.status(400).json({
        error : "Can't fetch your posts",
        err
      })
    }
  }

  async function getCategoryPost(req,res,next) {
    try{
        const category = req.params;
        const Posts = await Post.find(category);

        if(Posts.length != 0){
            return res.status(200).json({
              "success" : "category Posts fetched successfully",
              Posts
            })
          }
          
          return res.status(404).json({
            "error" : `No Posts found for category ${category.category}`
          })
        
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            "error" : "Some Error Occured",
            err
        })
    }
  }

  async function getPostById(req,res,next) {
    try{
        const id = req.params;
        const post = await Post.findOne({_id : id.id});
        if(post){
            const comments = await userComment.find({postId : id.id});
            const Author = await User.findOne({_id : post.authorId});
            return res.status(200).json({
                "success"  :"Post fetched successfully",
                Post : post,
                Author,
                comments
            })
        }
        return res.status(400).json({
            "error" : "Post not found",
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            "error"  :"Some error occured"
        })
    }
  }

  async function likePost(req,res,next){
    try{
        const postId = req.params;
        const post = await Post.findOne({_id : postId.id});
        if(post){
            const updatePost = await Post.updateOne(
            { _id: postId.id }, 
            { $inc: { Likes: 1 } } 
          );

            if(updatePost){
                const updatedPost = await Post.findOne({_id : postId.id});
                return res.status(200).json({
                    "success" : "You liked the Post",
                    updatedPost
                })
            }
            else{
                return res.status(400).json({
                    'error' : "Try again.",            err
                })
            }

        }
        return res.status(400).json({
            'error' : "Try again.",            err
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            'error' : "some error Occured",
            err
        })
    }
  }
  async function unlikePost(req,res,next){
    try{
        const postId = req.params;
        const post = await Post.findOne({_id : postId.id});
        if(post && post.Likes != 0){
            const updatePost = await Post.updateOne(
            { _id: postId.id }, 
            { $inc: { Likes: -1 } } 
          );

            if(updatePost){
                const updatedPost = await Post.findOne({_id : postId.id});
                return res.status(200).json({
                    "success" : "You unliked the Post",
                    updatedPost
                })
            }
            else{
                return res.status(400).json({
                    'error' : "Try again.",            err
                })
            }

        }
        return res.status(400).json({
            'error' : "Try again.",            err
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            'error' : "some error Occured",
            err
        })
    }
  }
  
  async function commentonPost(req,res,next) {
    try{
        const user = req.user;
        const postId = req.params;
        const {comment} = req.body;

        const newComment = new userComment({
            userId : user.id,
            postId : postId.id,
            comment
        })

        await newComment.save();

        await Post.findByIdAndUpdate(postId.id , {
            $inc : {noOFComments : 1}
        })

        
        return res.status(200).json({
            success : "Comment Added Successfully",
            newComment
        });
        
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            error : "Some error occured",
            err
        });
    }
  }

module.exports = {
  createPost,
  getPosts ,
  getUserPosts,
  getCategoryPost,
  getPostById,
  likePost,
  unlikePost,
  commentonPost
};
