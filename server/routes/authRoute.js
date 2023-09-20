import express from "express";
import { Login, logOut, Me } from "../controllers/authControllers.js";
import { recoveryPassword } from '../controllers/sendMailControllers.js'
import { resetPassword } from "../controllers/userController.js";
const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);
router.post('/send_recovery_email', recoveryPassword);
router.put('/user/reset-password/:id', resetPassword);


export default router;