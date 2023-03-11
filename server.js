//import express module
const express=require('express');
//create express applicatio
const app=express();

//import environment variables
require('dotenv').config();
//start server
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is on port ${port}`);
});

//import database connection
const Connection=require('./database/db.config');
//check connection
try{
    Connection.authenticate();
    console.log("DB Connection Success")
} catch(err){
    console.log("connection failed",err);
}