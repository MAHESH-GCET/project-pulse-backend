//import express async handler
const expressAsyncHandler=require('express-async-handler');
const {Op}=require('sequelize')
//import nodemailer
const nodemailer=require('nodemailer');
require('dotenv').config();

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
    let projectUnderManager=await Project.findAll(
      {
        where:{project_manager:req.employee.employee_id}
      }
    );
    res.send({message:`projects under manager ${req.employee.email}`,payload:projectUnderManager});
})

//controllor to get specific project details
exports.getSpecificProjectDetails=expressAsyncHandler(async(req,res)=>{
  let projectIdFromClient=req.params.project_id;
  //get project object 
  let projectObj=await Project.findOne({
      where:{
        project_id:projectIdFromClient
      },
      include:[
      {model:Project_Concerns},
      {model:Team_Composition}
    ]
  });
  //check if project data is available
  if (projectObj != undefined) {
    // retrieveing the project updates only before 2 weeks
    let today = new Date();
    let dateBeforeTwoWeeks = new Date();
    dateBeforeTwoWeeks.setDate(today.getDate() - 14);
    //gets updates between present date and 2 weeks ago
    let projectUpdatedBeforeTwoWeeks = await Project_Updates.findAll({
      where: {
        date: {
          [Op.between]: [dateBeforeTwoWeeks, today],
        },
      },
    });
    console.log(projectObj);
    //get project_fitness_indicator from projectobj
    let projectFitness=projectObj.dataValues.project_fitness_indicator;
    //count team_compositions to find team size
    let teamCount=projectObj.dataValues.team_compositions.length+3;
    console.log(projectFitness,teamCount);
    // send response
    res.send({
      message: `Project Detaitls for projectId ${projectIdFromClient}`,
      projectFitness:projectFitness,
      Team_Count:teamCount,
      payload: projectObj,
      projectUpdates: projectUpdatedBeforeTwoWeeks,
    });
  }
  else{
    res.send({message:"Project not found"})
  }
})

//create connection to smtp
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD, // app password
    },
});

//to raise a concern
exports.raiseConcern=expressAsyncHandler(async(req,res)=>{
  let concernObj=await Project_Concerns.create(req.body.project_concerns);
  //trigger mail
  let mailOptions = {
      from: "mehakarmahesh@gmail.com",
      to: "shamir@westagilelabs.com",
      subject: `new concern raised by ${concernObj.concern_raised_by}`,
      text: `the concern is ${concernObj.concern_desc}` ,
  };
  // send email
  transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log("err");
  } 
  else {
    console.log("email sent", info.messageId);
  }
  })
  res.send({message:"concern raised",payload:concernObj});
})

//modify existing concern
exports.modifyConcern=expressAsyncHandler(async(req,res)=>{
  let concernObj=await Project_Concerns.update(req.body,
    {
      where:{
        concern_id:req.params.concern_id}
    }
  )
  res.send({message:"concern status updated",payload:concernObj});
})

//to update project progress
exports.updateProjectProgress=expressAsyncHandler(async(req,res)=>{
  //create update 
    let updateObj=await Project_Updates.create(req.body.project_updates);
    res.send({message:"project progress updated",payload:updateObj});
})

//to modify project update
exports.modifyUpdate=expressAsyncHandler(async(req,res)=>{
  //modify update 
    let updateObj=await Project_Updates.update(req.body,
      {
        where:{
          update_id:req.params.update_id
        }
      }
    )
    res.send({message:"status updated",payload:updateObj});
})