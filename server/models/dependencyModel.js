import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Dependencies = db.define('dependencies', {
    
    dependencia:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },


}, {
    freezeTableName: true,
});
export default Dependencies;