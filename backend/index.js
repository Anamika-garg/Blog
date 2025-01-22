const express = require('express');
const app = express();
require('dotenv').config();

app.get('/' , (req,res)=>{
    res.send("hey")
})

app.listen(process.env.PORT , ()=>{
    console.log("Server started")
})