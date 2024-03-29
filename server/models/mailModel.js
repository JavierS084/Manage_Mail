import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Dependencies from "./dependencyModel.js";
import Groups from "./groupModel.js";
import MailTypes from "./mailTypeModel.js";
import Requests from "./requestModel.js";

const { DataTypes } = Sequelize;

const Mails = db.define('mails',{

    user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'El email ya fue registrado anteriormente registre uno nuevo'
        },
        validate: {
            isEmail: {
                msg: 'Email no valido'
            },
            notEmpty: {
                msg: 'Ingrese un email'
            }
        }
    },
    solicitante:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{ 
            notEmpty: true
        }
    },
    observation: {
        type: DataTypes.STRING, 
        allowNull: true,
        validate:{
            notEmpty: false,
        }
        
    },
    state:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate:{ 
            notEmpty: true
        }
    },
    dateInicial:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    dateFinal:{
        type: DataTypes.DATE,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    dateSolicitud:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty: true,
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


MailTypes.hasMany(Mails);
Mails.belongsTo(MailTypes, {foreignKey: 'mailTypeId'});

Groups.hasMany(Mails);
Mails.belongsTo(Groups, {foreignKey: 'groupId'});

Dependencies.hasMany(Mails);
Mails.belongsTo(Dependencies, {foreignKey: 'dependencyId'});

Requests.hasMany(Mails);
Mails.belongsTo(Requests, {foreignKey: 'requestId'});

export default Mails;
