import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import responseTime from "response-time";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import requestRoutes from "./routes/requestRoutes.js";
import dependencyRoutes from "./routes/dependencyRoutes.js";
import typeRoutes from "./routes/typeRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
import db from "./config/database.js"

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

/* shift + A + ALT */
 (async () => {
     await db.sync();
 })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));
store.sync();
/**El middleware cors vereifica si el usuario utiliza credenciles para enviar
 * la peticion y solo que pertenezcan a es dns accederan como tambien esta restringido los metodos
*/

app.use(cors({
    credentials: true,
    origin: `http://${process.env.HOSTNAME}:5173`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: true,
}));


app.use(responseTime());
app.use(express.json({ limit: "25mb" }));
//app.use(express.urlencoded({ limit: "25mb" }));
app.use(userRoute, authRoute, requestRoutes, dependencyRoutes, typeRoutes, groupRoutes, mailRoutes);


/**
 * El Puerto se inicializa en el archivo .env 
 * El hostname esta declarado para que solo desde un, process.env.USER_NAME, process.env.PASSWORD_USER , {
    host: "localhost", dominio pueda ser consultado
 */

app.listen(process.env.APP_PORT, process.env.HOSTNAME, () => {
    console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.APP_PORT}/`);
});

