const express=require('express');

//create admin application
const superAdminApp=express.Router();
//import employee model
const {Employees}=require('../database/models/employee.model');
//imprt middleware
const verifySuperAdmin=require('../middlewares/verifySuperAdmin');
const {assignRole} =require('../controllor/superAdmin.controllor');

//body parser
superAdminApp.use(express.json());

//admin has super access to assign role
superAdminApp.put('/super-admin/assign-role',verifySuperAdmin,assignRole);

//admin dashboard
superAdminApp.get('/super-admin/dashboard',verifySuperAdmin,);

//export super admin app
module.exports = superAdminApp;