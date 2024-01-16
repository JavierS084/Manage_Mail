import express from "express";
import { Login, logOut, Me } from "../controllers/authControllers.js";
import { recoveryPassword } from '../controllers/sendMailControllers.js'
import { resetPassword } from "../controllers/userController.js";
const router = express.Router();

router.get('/v1/api/managemail/me', Me);
router.post('/v1/api/managemail/login', Login);
router.delete('/v1/api/managemail/logout', logOut);
router.post('/v1/api/managemail/send_recovery_email', recoveryPassword);
router.put('/v1/api/managemail/user/reset-password/:id', resetPassword);


export default router;