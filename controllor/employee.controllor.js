//import express async handler
const expressAsyncHandler=require('express-async-handler');
//import bcrypt js
const bcryptjs=require('bcryptjs');
//import nodemailer
const nodemailer=require('nodemailer');
//import environment variables
require('dotenv').config();
//import json web token
const jwt=require("jsonwebtoken");
//import employee model
const {Employees}=require('../database/models/employee.model');

//employee registration
exports.employeeRegistration=expressAsyncHandler(async(req,res)=>{
  //get employee details from body
  let {employee_id,employee_name,age,gender,email,password,role}=req.body;
  //hash password
  let hashedPassword=await bcryptjs.hash(password,10);
  //inserting into employee table
  await Employees.create({
    employee_id: employee_id,
    employee_name:employee_name,
    age:age,
    gender:gender,
    email:email,
    password:hashedPassword,
    role:role
  });
  res.status(201).send({message:"employee registered"})
});

//employee login
exports.employeeLogin=expressAsyncHandler(async(req,res)=>{
  let {email,password}=req.body;
  //check if employee exists
  let employeeObj=await Employees.findOne({
    where:{email:email}
  });
  if(employeeObj==null){
    res.status(404).send({message:"employee not found"});
  }
  //if employee exists
  else{
    //verify password
    let verifyPassword= await bcryptjs.compare(password,employeeObj.password);
    if(verifyPassword===false){
      res.status(401).send({message:"invalid password"})
    }
    //if password verified, create jwt
    else{
      //create jwt token
      let signedToken=jwt.sign(
        {
          email:email,
          role:employeeObj.role,
          employee_id:employeeObj.employee_id
        },
        process.env.SECRET_KEY,{expiresIn:'7d'}
      )
      //send response
      res.status(200).send({message:"Login Successfull",payload:signedToken});
    }
  }
})

//create connection to smtp
const transporter = nodemailer.createTransport({
  //initialize values
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
  res.status(200).send({message:"otp sent by email"})
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
    res.status(200).send({ message: "Password reset sucessfully" });
  }
  // else
  else {
    res.status(401).send({ message: "Invalid OTP" });
  }
});