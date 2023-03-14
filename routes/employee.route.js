const express=require('express');
//create employee application
const employeeApp=express.Router();

//body parser
employeeApp.use(express.json());

const {employeeRegistration,employeeLogin,forgotPassword,resetPassword} =require('../controllor/employee.controllor');
//routes
//employee registration
employeeApp.post('/employee-registration',employeeRegistration );

//employee login
employeeApp.post('/employee-login',employeeLogin)

//forgot password
employeeApp.post('/forgot-password',forgotPassword);

//reset passsword
employeeApp.put('/reset-password/:email',resetPassword);

//export app
module.exports = employeeApp;