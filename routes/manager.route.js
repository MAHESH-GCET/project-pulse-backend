const express=require('express');
//create manager mini application
const managerApp=express.Router();

//body parser
managerApp.use(express.json());

//import token verification middleware
const verifyManager=require('../middlewares/verifyManager');
//import controllor
const {getProjectUnderManager,raiseConcern,updateProjectProgress,getSpecificProjectDetails,modifyConcern,modifyUpdate}=require('../controllor/manager.controllor');
//routes
//to get project under project manager
managerApp.get('/manager/projects',verifyManager,getProjectUnderManager);

//to get project under specific project
managerApp.get('/manager/project/:project_id',verifyManager,getSpecificProjectDetails);

//to raise a concern
managerApp.post('/manager/project-concern',verifyManager,raiseConcern);

//modify existing project concern
managerApp.put('/manager/modify-project-concern/:concern_id',verifyManager,modifyConcern);

//to update the project
managerApp.post('/manager/project-update',verifyManager,updateProjectProgress);

//modify existing project update
managerApp.put('/manager/modify-project-update/:update_id',verifyManager,modifyUpdate);

//export manager app
module.exports = managerApp;
