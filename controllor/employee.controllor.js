//import express async handler
const expressAsyncHandler=require('express-async-handler');
//import bcrypt js
const bcryptjs=require('bcryptjs');
//import nodemailer
const nodemailer=require('nodemailer');

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

//create connection to smtp
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD, // app password
    },
});
//to store the otp
let otps = {};

//forgot password
exports.forgotPassword=expressAsyncHandler(async(req,res)=>{
    //generate otp
    let otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    console.log(otp); //176717
    otps[req.body.email] = otp;
    console.log(req.body.email);
    // defining mail options
    let mailOptions = {
        from: "mahesh",
        to: req.body.email,
        subject: "OTP to reset password for project pulse",
        text: `Hi, OTP to reset password is : ` + otp,
    };

    // send email
    transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("err");
    } 
    else {
      console.log("email sent", info.messageId);
    }
    })
    res.send({message:"otp sent by email"})
});

//reset password
exports.resetPassword = expressAsyncHandler(async (req, res) => {
    // checking if the otp is valid
    //otp matches
    if (req.body.otp == otps[req.params.email]) {
      console.log("password verified");
      let hashedPassword = await bcryptjs.hash(req.body.password, 6);
      console.log("email", req.params.email);
      let updatedCount = await Employees.update({ password: hashedPassword },
        {
          where: {email: req.params.email},
        }
      );
      res.send({ message: "Password reset sucessfully" });
    }
    // else
    else {
      res.send({ message: "Invalid OTP" });
    }
});