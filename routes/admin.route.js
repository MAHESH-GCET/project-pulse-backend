//import express
const express=require('express');
//create admin mini appication
const adminApp=express.Router();

//body parser
adminApp.use(express.json());
//import req handlers
const {addProject,detailedProjectView,specificProjectView,getResourceRequests,updateProject,deleteProject}=require('../controllor/admin.controllor');
//import authentication middleware
const verifyAdmin=require('../middlewares/verifyAdmin')

//route to create project
adminApp.post('/admin/add-project',verifyAdmin,addProject);

//route to get specific project details
adminApp.get('/admin/projects',verifyAdmin,detailedProjectView);

//route to get project details of specific project
adminApp.get('/admin/project/:project_id',verifyAdmin,specificProjectView);

//get resource requests on a project
adminApp.get('/admin/project/:project_id/resource-requests',verifyAdmin,getResourceRequests);

//update project details
adminApp.put('/admin/edit/project/:project_id',verifyAdmin,updateProject);

//delete project
adminApp.delete('/admin/edit/project/:project_id',verifyAdmin,deleteProject);

//export app
module.exports=adminApp;