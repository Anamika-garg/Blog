const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors({
    origin : process.env.FRONTEND_URL,
    allowedHeaders: 'Content-Type,Authorization',
}));

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to database");
}).catch(()=>{
    console.log("Some Error Occured!")
})

app.get('/' , (req,res)=>{
    res.send("hey")
})

app.use('/api/user' ,userRoutes );
app.use('/api/post' ,postRoutes );

app.listen(process.env.PORT , ()=>{
    console.log("Server started")
})