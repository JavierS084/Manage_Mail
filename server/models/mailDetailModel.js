/*import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Dependencies from "./dependencyModel.js";
import Groups from "./groupModel.js";
import MailTypes from "./mailTypeModel.js";
import Requests from "./requestModel.js";

const { DataTypes } = Sequelize;

const MailDetail = db.define('mailDetail',{

    observation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
        
    },
    statu:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate:{ 
            notEmpty: true
        }
    },
    mailTypeId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    groupId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: false
        }
    },
    dependencyId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    requestId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

}, {
    freezeTableName: true,
});


MailTypes.hasMany(MailDetail);
MailDetail.belongsTo(MailTypes, {foreignKey: 'mailTypeId'});

Groups.hasMany(MailDetail);
MailDetail.belongsTo(Groups, {foreignKey: 'groupId'});

Dependencies.hasMany(MailDetail);
MailDetail.belongsTo(Dependencies, {foreignKey: 'dependencyId'});

Requests.hasMany(MailDetail);
MailDetail.belongsTo(Requests, {foreignKey: 'requestId'});

export default MailDetail;
*/