const express = require('express');
const { register , login , update ,getAuthors  } = require('../controllers/userControllers');
const { verify } = require('../middleware/verifyToken');
const router = express.Router();

router.post('/register' , register);
router.post('/login' , login);
router.post('/update' , verify, update);
router.get('/getAuthors' , getAuthors);


module.exports = router