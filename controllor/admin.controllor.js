const expressAsyncHandler=require('express-async-handler');
const { where } = require('sequelize');

//import project model
const {Project}=require('../database/models/project.model');
const {Project_Concerns}=require('../database/models/project_concerns.model');
const {Project_Updates}=require('../database/models/project_updates.model');
const {Resource_Requests}=require('../database/models/resource_requests.model');
const {Team_Composition}=require('../database/models/team-composition.model');
//add new project
exports.addProject=expressAsyncHandler(async(req,res)=>{
    let newProject=req.body;
    await Project.create(req.body);
    res.send({message:"new project added"});
})

//get project details
exports.detailedProjectView=expressAsyncHandler(async(req,res)=>{
    let projectObj=await Project.findAll({
        include:[
            {model:Team_Composition},
            {model:Project_Updates},
            {model:Project_Concerns},
            {model:Resource_Requests}
        ]
    });
    res.send({message:"details of all projects",payload:projectObj});
})

//get project details of specific project
exports.specificProjectView=expressAsyncHandler(async(req,res)=>{
    let project_id=req.params.project_id;
    let projectObj=await Project.findOne({where:{project_id:project_id},
        include:[
            {model:Team_Composition},
            {model:Project_Updates},
            {model:Project_Concerns},
            {model:Resource_Requests}
        ]
    });
    res.send({message:`details view of project ${project_id}`,payload:projectObj});
})

//get resource requests of specific project
exports.getResourceRequests=expressAsyncHandler(async(req,res)=>{
    let project_id=req.params.project_id;
    let requestObj=await Resource_Requests.findOne({where:{project_id:project_id}});
    res.send({message:`resource requests for project ${req.params.project_id}`,payload:requestObj})
})

//modify existing project details
exports.updateProject=expressAsyncHandler(async(req,res)=>{
    let project_id=req.params.project_id;
    await Project.update(req.body,{where:{project_id:project_id}});
    res.send({message:`project ${project_id} updated`});
})

//delete project
exports.deleteProject=expressAsyncHandler(async(req,res)=>{
    let project_id = req.params.project_id;
    await Project.destroy({where:{project_id:project_id}});
    res.send({message:`project ${project_id} deleted`});
})