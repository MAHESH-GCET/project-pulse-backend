const connection=require('../db.config');
const {DataTypes}=require('sequelize');

//project concerns model
exports.Project_Concerns=connection.define('project_concerns',{
    concern_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    concern_desc:{
        type:DataTypes.STRING,
        allowNull:false
    },
    concern_raised_by:{
        type:DataTypes.STRING,
        allowNull:false
    },
    concern_raised_on_date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    severity_of_concern:{
        type:DataTypes.STRING,
        allowNull:false
    },
    concern_raised_by_client:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    status_of_concern:{
        type:DataTypes.STRING,
        allowNull:false
    },
    concern_mitigation_date:{
        type:DataTypes.DATE,
        allowNull:true
    }
},{
    freezeTableName:true,
    timestamps:false
});