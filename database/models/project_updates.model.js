//import db connection
const connection=require('../db.config');
const {DataTypes}=require('sequelize');

//project updates model
exports.Project_Updates=connection.define('project_updates',{
    update_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    date:{
        type:DataTypes.DATE
    },
    project_status:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    schedule_status:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    resourcing_status:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    quality_status:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    waiting_for_client_ip:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }
},{
    timestamps:false,
    freezeTableName:true
});