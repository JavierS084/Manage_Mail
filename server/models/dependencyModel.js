import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Dependencies = db.define('dependencies', {

    dependencia: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'La dependencia no puede ser igual a un existente'
        },
        validate: {

            notEmpty: {
                msg: 'Ingrese una depencia primeramente'
            }
        }
    },


}, {
    freezeTableName: true,
});
export default Dependencies;