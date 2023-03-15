//import express async handler
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
    //gets projects only under gdo
    let projectsUnderGdo=await Project.findAll({
        where: {
            gdo_head: req.employee.employee_id
        }
    });
    res.status(200).send({payload:projectsUnderGdo});
});

//get all employees
exports.employeeList=expressAsyncHandler(async(req,res)=>{
    //get all employees from employee model
    let employeeList=await Employees.findAll();
    res.status(200).send({payload:employeeList});
})
//assign team
exports.AssignTeam=expressAsyncHandler(async(req,res)=>{
    //assigns team as bulk
    //employee-team composition
    await Team_Composition.bulkCreate(req.body.team_composition);
    res.status(201).send({message:"team assigned"})
});

//particular project details
exports.projectDetails=expressAsyncHandler(async(req,res)=>{
    let project_id=req.params.project_id;
    let projectObj=await Project.findByPk(project_id,
        {
            include:[
                {model:Team_Composition},
                {model:Project_Updates},
                {model:Project_Concerns},
                {model:Resource_Requests}
            ]
        }
    );
    res.status(200).send({message:`project details of ${project_id} are`,payload:projectObj})
})

//raise resourcing request
exports.resourceRequest=expressAsyncHandler(async(req,res)=>{
    let project_id=req.params.project_id;
    //raise new request
    let resourceObj=await Resource_Requests.create(
        {
            project_id:project_id,
            resource_desc:req.body.resource_desc
        }
    );
    res.status(201).send({message:"request raised",payload:resourceObj});
});