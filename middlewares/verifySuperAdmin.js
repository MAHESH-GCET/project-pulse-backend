//create verify token miiddleware
//import jwt for testing token
const jwt=require("jsonwebtoken");
require('dotenv').config();
const expressAsyncHandler=require('express-async-handler');
//import employeee model
const {Employees}=require('../database/models/employee.model');
const verifySuperAdmin =expressAsyncHandler(async(req,res,next)=>{
    //token verification logic
    //get bearer token from header req
    let bearerToken=req.headers.authorization;
    //check existence of bearer token
    if(bearerToken==undefined){
        res.send({message:"unauthorized access"})
    }
    //if bearer token exists, get token from bearer token
    else
    {
    let token=bearerToken.split(" ")[1]; //["bearer",token]    
    //decode token
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
    if(err){
        res.send({message:"session expired"})        
    }
    else{
        console.log(decoded.role);
        if(decoded.role=="super-admin"){
            
            next();
        }
        else{
            res.send({message:"you are not authorized"})
        }
    }
    });
    }   
});
module.exports =verifySuperAdmin;