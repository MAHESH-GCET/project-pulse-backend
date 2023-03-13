const express=require('express');
//create employee application
const employeeApp=express.Router();

//body parser
employeeApp.use(express.json());

const {employeeRegistration,employeeLogin} =require('../controllor/employee.controllor');
//routes
//employee registration
employeeApp.post('/employee-registration',employeeRegistration );

//employee login
employeeApp.post('/employee-login',employeeLogin)
module.exports = employeeApp;