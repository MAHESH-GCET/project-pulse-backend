const express=require('express');
//create gdo mini application
const gdoApp=express.Router();

//body parser
gdoApp.use(express.json());

//impport middleware
const verifyGdo=require('../middlewares/verifyGdo');
const {AssignTeam,allProjects,employeeList,projectDetails,resourceRequest}=require('../controllor/gdo.controllor');
//route

//get all projects
gdoApp.get('/gdo/projects',verifyGdo,allProjects);

//assign a team for project
gdoApp.post('/gdo/assign-team',verifyGdo,AssignTeam);

//all employees
gdoApp.get('/gdo/employees',verifyGdo,employeeList);

//specific details of a project
gdoApp.get('/gdo/project/:project_id',verifyGdo,projectDetails);

//raising resource request
gdoApp.post('/gdo/project/:project_id/resource-request',verifyGdo,resourceRequest);

//export gdo app
module.exports = gdoApp;