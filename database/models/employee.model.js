//import database connection
const connection=require('../db.config');;
//import datatypes
const {DataTypes} = require('sequelize');
//define model
exports.Employees=connection.define('employees',{
    employee_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    employee_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            isIn: {
              args: [["male", "female"]],
              msg: "Enter valid gender value... male or female",
            },
          },
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate: {
            isEmail: {
              msg: "Invalid Email",
            },
            contains:'westagilelabs'
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
    }
},{
    freezeTableName:true,
    timestamps:false
});
(()=>this.Employees.sync())();