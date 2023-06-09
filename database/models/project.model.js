//import db connection
const connection=require('../db.config');
const {DataTypes}=require('sequelize');

//define project model
exports.Project=connection.define('project',{
    project_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    project_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    client:{
        type:DataTypes.STRING,
        allowNull:false
    },
    client_account_manager:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    project_start_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    project_end_date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    project_fitness_indicator:{
        type:DataTypes.STRING,
        allowNull:false
    },
    domain:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type_of_project:{
        type:DataTypes.STRING,
        allowNull:false
    },
    team_size:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    gdo_head:{
        type:DataTypes.INTEGER,
        allowNull:false

    },
    project_manager:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true
    }
},{
    freezeTableName:true,
    timestamps:false
});