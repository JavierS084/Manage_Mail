import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import requestRoutes from "./routes/requestRoutes.js";
import dependencyRoutes from "./routes/dependencyRoutes.js";
import typeRoutes from "./routes/typeRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
import db from "./config/database.js";

const hostname = 'localhost';
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});
/*
(async () => {
    await db.sync();
})();
**/
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));
/**El middleware cors vereifica si el usuario utiliza credenciles para enviar
 * la peticion y solo que pertenezcan a es dns accederan como tambien esta restringido los metodos
 */
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: true,
}));



app.use(express.json());
app.use(userRoute);
app.use(authRoute);
app.use(requestRoutes)
app.use(dependencyRoutes);
app.use(typeRoutes);
app.use(groupRoutes);
app.use(mailRoutes);

store.sync();


/**
 * El Puerto se inicializa en el archivo .env 
 * El hostname esta declarado para que solo desde un dominio pueda ser consultado
 */

app.listen(process.env.APP_PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${process.env.APP_PORT}/`);
});

