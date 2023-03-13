const express=require('express');
const adminApp=express.Router();

//body parser
adminApp.use(express.json());
//import req handlers
const {addProject}=require('../controllor/admin.controllor');
//import authentication middleware
const verifyAdmin=require('../middlewares/verifyAdmin')
//route to create project
adminApp.post('/admin/add-project',verifyAdmin,addProject);

module.exports=adminApp;