//import express async handler
const exp = require('constants');
const expressAsyncHandler=require('express-async-handler');
//import all models
const {Employees}=require('../database/models/employee.model');
const {Project}=require('../database/models/project.model');
const {Project_Concerns}=require('../database/models/project_concerns.model');
const {Project_Updates}=require('../database/models/project_updates.model');
const {Resource_Requests}=require('../database/models/resource_requests.model');
const {Team_Composition}=require('../database/models/team-composition.model');

//associations
//project - team allocation
Project.Team_Composition=Project.hasMany(Team_Composition,{foreignKey:"project_id"});
Team_Composition.Project=Team_Composition.belongsTo(Project,{foreignKey:"project_id"});


//get all projects
exports.allProjects=expressAsyncHandler(async(req,res)=>{
    let projectsUnderGdo=await Project.findAll({where: {gdo_head: req.employee.employee_id}});
    res.send({payload:projectsUnderGdo});
});
//assign team
exports.AssignTeam=expressAsyncHandler(async(req,res)=>{
    await Team_Composition.bulkCreate(req.body.team_composition);
    res.send({message:"team assigned"})
});

//particular project details
exports.projectDetails=expressAsyncHandler(async(req,res)=>{

})