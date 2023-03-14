//import express module
const express=require('express');
//create express application
const app=express();

//import environment variables
require('dotenv').config();
//start server
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is on port ${port}`);
});

//import database connection
const Connection=require('./database/db.config');
//check connection
try{
    Connection.authenticate();
    console.log("DB Connection Success")
} catch(err){
    console.log("connection failed",err);
}

//import employee api
const employeeApp=require('./routes/employee.route');
app.use(employeeApp)

//import super-admin api
const superAdminApp=require('./routes/superAdmin.route');
app.use(superAdminApp);

//import admin app
const adminApp=require('./routes/admin.route');
app.use(adminApp);

//import gdo app
const gdoApp=require('./routes/gdo.route');
app.use(gdoApp);

//import manager app
const managerApp=require('./routes/manager.route');
app.use(managerApp);


//error handling middlewares
app.use((err, req, res, next)=>{
    res.send({errMsg: err.message})
})

//handlling errors in application
app.use((error, req,res,next)=>{
    res.send({message:"error occured",Error:error.message})
})

