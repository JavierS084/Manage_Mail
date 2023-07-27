import {Sequelize} from "sequelize";

const db = new Sequelize('mailSystem', 'root', 'password', {
    host: "localhost",
    dialect: "mysql",
    charset: "utf8",
    collate: "utf8_persian_ci",
    timezone: "-03:00"
});

export default db;