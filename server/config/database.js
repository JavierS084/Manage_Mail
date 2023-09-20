import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.PASSWORD_USER, {
    host: "localhost",
    dialect: "mysql",
    charset: "utf8",
    collate: "utf8_persian_ci",
    timezone: "-03:00"
});

export default db;