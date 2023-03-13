const expressAsyncHandler=require('express-async-handler');
//import employee module
const {Employees}=require('../database/models/employee.model');

//assign roles
exports.assignRole=expressAsyncHandler(async(req,res)=>{
    let {email,role}=req.body;
    let employeeObj=await Employees.findOne({where: {email:email}});
    if(employeeObj==null){
        res.send({message:"employee not found"})
    }
    else{
        await Employees.update({role:role},{where:{email:email}});
        res.send({message:`employee ${email} assigned as ${role}`})
    }
})