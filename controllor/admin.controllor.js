const expressAsyncHandler=require('express-async-handler');

//import project model
const {Project}=require('../database/models/project.model');

//add new project
exports.addProject=expressAsyncHandler(async(req,res)=>{
    let newProject=req.body;
    await Project.create(req.body);
    res.send({message:"new project added"});
})

