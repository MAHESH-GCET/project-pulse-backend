const expressAsyncHandler=require('express-async-handler');
//import employee module
const {Employees}=require('../database/models/employee.model');

//assign roles
exports.assignRole=expressAsyncHandler(async(req,res)=>{
    let {email,role}=req.body;
    //find employee with clients email
    let employeeObj=await Employees.findOne(
        {
            where:{
                email:email
            }
        }
    );
    //when employee not found
    if(employeeObj==null){
        res.status(404).send({message:"employee not found"})
    }
    //employee found
    else{
        await Employees.update(
            {role:role},
            {
                where:
                {
                    email:email
                }
            }
        );
        res.status(200).send({message:`employee ${email} assigned as ${role}`})
    }
})