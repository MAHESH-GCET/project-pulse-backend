//import express async handler
const expressAsyncHandler=require('express-async-handler');
const { where } = require('sequelize');

//import all models
const {Employees}=require('../database/models/employee.model');
const {Project}=require('../database/models/project.model');
const {Project_Concerns}=require('../database/models/project_concerns.model');
const {Project_Updates}=require('../database/models/project_updates.model');
const {Resource_Requests}=require('../database/models/resource_requests.model');
const {Team_Composition}=require('../database/models/team-composition.model');

//associations
//project-project_concerns
Project.Project_Concerns=Project.hasMany(Project_Concerns,{foreignKey:"project_id"});
Project_Concerns.Project=Project_Concerns.belongsTo(Project,{foreignKey:"project_id"});
//project-project_updates
Project.Project_Updates=Project.hasMany(Project_Updates,{foreignKey:"project_id"});
Project_Updates.Project=Project_Updates.belongsTo(Project,{foreignKey:"project_id"});
//project-resource requests
Project.Resource_Requests=Project.hasMany(Resource_Requests,{foreignKey:"project_id"});
Resource_Requests.Project=Resource_Requests.belongsTo(Project,{foreignKey:"project_id"});

//controllor to get all project
exports.getProjectUnderManager=expressAsyncHandler(async(req,res)=>{
    let projectUnderManager=await Project.findAll({where:{project_manager:req.employee.employee_id}});
    res.send({message:`projects under manager ${req.employee.email}`,payload:projectUnderManager});
})

//controllor to get specific project details
exports.getSpecificProjectDetails=expressAsyncHandler(async(req,res)=>{
    let projectIdFromClient=req.params.project_id;
    let projectObj=await Project.findAll({where:{project_id:projectIdFromClient},
        include:[
        {model:Project_Concerns},
        {model:Project_Updates}
        ]
    });
    res.send({message:`project under ${projectIdFromClient} `,payload:projectObj})
})
//to raise a concern
exports.raiseConcern=expressAsyncHandler(async(req,res)=>{
    let concernObj=await Project_Concerns.create(req.body.project_concerns);
    res.send({message:"concern raised",payload:concernObj});
})

//modify existing concern
exports.modifyConcern=expressAsyncHandler(async(req,res)=>{
    let concernObj=await Project_Concerns.update(req.body,{where:{concern_id:req.params.concern_id}})
    res.send({message:"concern status updated",payload:concernObj});
})

//to update project progress
exports.updateProjectProgress=expressAsyncHandler(async(req,res)=>{
    let updateObj=await Project_Updates.create(req.body.project_updates);
    res.send({message:"project progress updated",payload:updateObj});
})

//to modify project update
exports.modifyUpdate=expressAsyncHandler(async(req,res)=>{
    let updateObj=await Project_Updates.update(req.body,{where:{update_id:req.params.update_id}})
    res.send({message:"status updated",payload:updateObj});
})