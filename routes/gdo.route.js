const express=require('express');
const gdoApp=express.Router();

//body parser
gdoApp.use(express.json());

//impport middleware
const verifyGdo=require('../middlewares/verifyGdo');
const {AssignTeam,allProjects}=require('../controllor/gdo.controllor');
//route
//get all projects
gdoApp.get('/projects',verifyGdo,allProjects);
gdoApp.post('/assign-team',verifyGdo,AssignTeam);

module.exports = gdoApp;