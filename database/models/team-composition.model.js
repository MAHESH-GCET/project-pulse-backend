const connection=require('../db.config');
const {DataTypes}=require('sequelize');
const {Project}=require('./project.model');
//tema-composition model
exports.Team_Composition=connection.define('team_composition',{
    role_in_project:{
        type:DataTypes.STRING,
        allowNull:false
    },
    start_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    end_date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    billing_status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    exposed_to_customer:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    allocation_type:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
});