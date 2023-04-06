const express=require('express');

//create admin application
const superAdminApp=express.Router();
//import employee model
const {Employees}=require('../database/models/employee.model');
//imprt middleware
const verifySuperAdmin=require('../middlewares/verifySuperAdmin');
const {assignRole,getAllEmployees} =require('../controllor/superAdmin.controllor');

//body parser
superAdminApp.use(express.json());

//admin has super access to assign role
superAdminApp.put('/super-admin/assign-role',verifySuperAdmin,assignRole);

//all employees
superAdminApp.get('/super-admin/employees',verifySuperAdmin,getAllEmployees);

//export super admin app
module.exports = superAdminApp;