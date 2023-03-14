//import sequelize and mysql
const {Sequelize} = require('sequelize');
const mysql=require('mysql2');

//import environment variables
require('dotenv').config();

//database connection
const Connection=new Sequelize(process.env.DB_NAME,process.env.DB_User,process.env.DB_Password,{
    root:"localhost",
    dialect:"mysql"
});
Connection.sync();
//export db connection
module.exports=Connection;