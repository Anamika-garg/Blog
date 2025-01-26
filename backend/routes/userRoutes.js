const express = require('express');
const { register , login , update ,getAuthors, profile, authorById,continueWithGoogle  } = require('../controllers/userControllers');
const { verify } = require('../middleware/verifyToken');
const router = express.Router();

router.post('/register' , register);
router.post('/login' , login);
router.put('/update' , verify, update);
router.get('/getAuthors' , getAuthors);
router.get('/profile' , verify , profile);
router.get('/author/:id' , authorById);
router.post('/continueWithGoogle' , continueWithGoogle);


module.exports = router