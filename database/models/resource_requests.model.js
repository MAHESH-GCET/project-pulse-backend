//import db connection
const connection=require('../db.config');
const {DataTypes}=require('sequelize');

//resouece request model
exports.Resource_Requests=connection.define('resource_requests',{
    resource_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    resource_desc:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
});