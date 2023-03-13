//import express async handler
const expressAsyncHandler=require('express-async-handler');
const bcryptjs=require('bcryptjs');
require('dotenv').config();
//import json web token
const jwt=require("jsonwebtoken");
//import employee model
const {Employees}=require('../database/models/employee.model');
//employee registration
exports.employeeRegistration=expressAsyncHandler(async(req,res)=>{
    let {employee_id,employee_name,age,gender,email,password,role}=req.body;
    let hashedPassword=await bcryptjs.hash(password,10);
    await Employees.create({
        employee_id: employee_id,
        employee_name:employee_name,
        age:age,
        gender:gender,
        email:email,
        password:hashedPassword,
        role:role
    });
    res.send({message:"employee registered"})
});
//employee login
exports.employeeLogin=expressAsyncHandler(async(req,res)=>{
    let {email,password}=req.body;
    let checkEmployee=await Employees.findOne({where:{email:email}});
    if(checkEmployee==null){
        res.send({message:"employee not found"});
    }
    else{
        let verifyPassword= await bcryptjs.compare(password,checkEmployee.password);
        if(verifyPassword===false){
            res.send({message:"invalid password"})
        }
        //if password verified, create jwt
        else{
            //create jwt token
            let signedToken=jwt.sign({email:email,role:checkEmployee.role,employee_id:checkEmployee.employee_id},process.env.SECRET_KEY,{expiresIn:6000})
            //send response
            res.send({message:"Login Successfull",payload:signedToken});
        }
    }
})