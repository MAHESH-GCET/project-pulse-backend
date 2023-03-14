const express=require('express');
const gdoApp=express.Router();

//body parser
gdoApp.use(express.json());

//impport middleware
const verifyGdo=require('../middlewares/verifyGdo');
const {AssignTeam,allProjects,employeeList,projectDetails,resourceRequest}=require('../controllor/gdo.controllor');
//route

//get all projects
gdoApp.get('/projects',verifyGdo,allProjects);

//assign a team for project
gdoApp.post('/assign-team',verifyGdo,AssignTeam);

//all employees
gdoApp.get('/employees',verifyGdo,employeeList);

//specific details of a project
gdoApp.get('/project/:project_id',verifyGdo,projectDetails);

//raising resource request
gdoApp.post('/project/:project_id/resource-request',verifyGdo,resourceRequest);
module.exports = gdoApp;